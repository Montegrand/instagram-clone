import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '@services/firebaseClient.js'

const normalizePhone = (value) => {
  if (!value) return ''
  return String(value).replace(/[^\d+]/g, '')
}

const normalizeNickname = (value, fallback) => {
  const trimmed = String(value || '').trim()
  if (trimmed) return trimmed
  return String(fallback || '').trim()
}

const buildUserPayload = ({ uid, email, phone, name, nickname }) => ({
  uid,
  email: email || '',
  phone: normalizePhone(phone),
  name: String(name || '').trim(),
  nickname: normalizeNickname(nickname, name),
})

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const withTimeout = (promise, ms, label) => {
  let timeoutId
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Timeout after ${ms}ms (${label})`))
    }, ms)
  })
  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId)
  })
}

const saveUserProfileWithRetry = async ({
  uid,
  email,
  phone,
  name,
  nickname,
  maxAttempts = 3,
  retryDelayMs = 3000,
}) => {
  const payload = buildUserPayload({
    uid,
    email,
    phone,
    name,
    nickname,
  })
  const userRef = doc(db, 'users', payload.uid)

  const attemptSave = async () => {
    await setDoc(
      userRef,
      {
        ...payload,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )
  }

  let lastError = null
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await withTimeout(
        attemptSave(attempt),
        10000,
        `users/${payload.uid} setDoc attempt ${attempt}`,
      )
      return { ok: true }
    } catch (error) {
      lastError = error
      if (attempt < maxAttempts) {
        await sleep(retryDelayMs)
      }
    }
  }

  return { ok: false, error: lastError }
}

export const signupWithEmail = async ({
  email,
  password,
  phone,
  name,
  nickname,
  redirectUrl,
}) => {
  if (!email) {
    return { ok: false, error: 'Email is required.' }
  }
  if (!password) {
    return { ok: false, error: 'Password is required.' }
  }
  if (!name) {
    return { ok: false, error: 'Name is required.' }
  }

  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await credential.user.getIdToken(true)

    try {
      await sendEmailVerification(credential.user)
    } catch (e) {
      console.log(e)
      // Ignore verification errors to avoid blocking signup.
    }

    const saveResult = await saveUserProfileWithRetry({
      uid: credential.user.uid,
      email: credential.user.email,
      phone,
      name,
      nickname,
    })
    if (!saveResult.ok) {
      return { ok: false, error: 'Failed to save profile.' }
    }

    await signOut(auth)

    return {
      ok: true,
      data: {
        uid: credential.user.uid,
        email: credential.user.email || '',
        phone: normalizePhone(phone),
        name: String(name || '').trim(),
        nickname: normalizeNickname(nickname, name),
      },
      redirectUrl: redirectUrl ?? '/feed',
    }
  } catch (error) {
    return { ok: false, error: error?.message || 'Signup failed.' }
  }
}

export const upsertUserProfileIfVerified = async ({ phone, name, nickname }) => {
  const user = auth.currentUser
  if (!user) {
    return { ok: false, error: 'No authenticated user.' }
  }
  if (!user.emailVerified) {
    return { ok: false, error: 'Email is not verified yet.' }
  }

  try {
    const payload = buildUserPayload({
      uid: user.uid,
      email: user.email,
      phone,
      name,
      nickname,
    })

    const userRef = doc(db, 'users', payload.uid)
    const existingSnap = await getDoc(userRef)
    const timestampPayload = existingSnap.exists()
      ? { updatedAt: serverTimestamp() }
      : { createdAt: serverTimestamp(), updatedAt: serverTimestamp() }

    await setDoc(userRef, { ...payload, ...timestampPayload }, { merge: true })
    return {
      ok: true,
      data: {
        uid: payload.uid,
        email: payload.email,
        phone: payload.phone,
        name: payload.name,
        nickname: payload.nickname,
      },
    }
  } catch (error) {
    return { ok: false, error: error?.message || 'Failed to save profile.' }
  }
}

export const loginWithEmail = async ({ email, password, redirectUrl }) => {
  if (!email) {
    return { ok: false, error: 'Email is required.' }
  }
  if (!password) {
    return { ok: false, error: 'Password is required.' }
  }

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    if (!credential.user.emailVerified) {
      await signOut(auth)
      return {
        ok: false,
        code: 'EMAIL_NOT_VERIFIED',
        error: 'Email is not verified yet.',
      }
    }

    return {
      ok: true,
      data: {
        uid: credential.user.uid,
        email: credential.user.email || '',
      },
      redirectUrl: redirectUrl ?? '/feed',
    }
  } catch (error) {
    return { ok: false, error: error?.message || 'Login failed.' }
  }
}

export const resendVerificationEmail = async ({ email, password }) => {
  if (!email || !password) {
    return { ok: false, error: 'Email and password are required.' }
  }

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(credential.user)
    await signOut(auth)
    return { ok: true }
  } catch (error) {
    return { ok: false, error: error?.message || 'Failed to resend verification.' }
  }
}

export default {
  signupWithEmail,
  upsertUserProfileIfVerified,
  loginWithEmail,
  resendVerificationEmail,
}
