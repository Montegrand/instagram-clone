import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '@services/firebaseClient.js'
import { clearUser, setUser, setUserError, setUserStatus } from '@store/userSlice.js'

function UserMiddleware({ children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserStatus('loading'))

    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          dispatch(clearUser())
          return
        }
        if (!user.emailVerified) {
          dispatch(clearUser())
          return
        }

        dispatch(
          setUser({
            uid: user.uid,
            email: user.email || '',
            photoURL: user.photoURL || '',
            username: '',
            nickname: '',
            bio: '',
          }),
        )

        // Firestore 프로필 로드 시도 (실패해도 앱은 계속 작동)
        try {
          const userRef = doc(db, 'users', user.uid)
          const userSnap = await getDoc(userRef)
          
          if (!userSnap.exists()) {
            await setDoc(
              userRef,
              {
                uid: user.uid,
                email: user.email || '',
                createdAt: serverTimestamp(),
              },
              { merge: true },
            )
          }
          const profile = userSnap.exists() ? userSnap.data() : {}

          dispatch(
            setUser({
              uid: user.uid,
              email: user.email || '',
              photoURL: user.photoURL || '',
              username: profile.username || '',
              nickname: profile.nickname || '',
              bio: profile.bio || '',
            }),
          )
        } catch (error) {
          // Firestore 에러 시에도 기본 정보로 로그인 유지
          dispatch(
            setUser({
              uid: user.uid,
              email: user.email || '',
              photoURL: user.photoURL || '',
              username: '',
              nickname: '',
              bio: '',
            }),
          )
        }
      },
      (error) => {
        dispatch(setUserError(error?.message || 'Auth subscription failed.'))
      },
    )

    return () => unsubscribe()
  }, [dispatch])

  return children
}

export default UserMiddleware
