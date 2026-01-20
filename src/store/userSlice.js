import { createSlice } from '@reduxjs/toolkit'

const defaultProfileImage = '/images/profile/avatar-default.png'

const initialState = {
  uid: null,
  username: '',
  nickname: '',
  email: '',
  photoURL: defaultProfileImage,
  bio: '',
  isAuthenticated: false,
  status: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { uid, username, nickname, email, photoURL, bio } = action.payload
      const normalizedPhotoURL = typeof photoURL === 'string' ? photoURL.trim() : ''
      state.uid = uid || null
      state.username = username || ''
      state.nickname = nickname || ''
      state.email = email || ''
      state.photoURL = normalizedPhotoURL || defaultProfileImage
      state.bio = bio || ''
      state.isAuthenticated = Boolean(uid)
      state.status = 'succeeded'
      state.error = null
    },
    clearUser(state) {
      state.uid = null
      state.username = ''
      state.nickname = ''
      state.email = ''
      state.photoURL = defaultProfileImage
      state.bio = ''
      state.isAuthenticated = false
      state.status = 'idle'
      state.error = null
    },
    setUserStatus(state, action) {
      state.status = action.payload
    },
    setUserError(state, action) {
      state.error = action.payload
      state.status = 'failed'
    },
  },
})

export const { setUser, clearUser, setUserStatus, setUserError } = userSlice.actions

export default userSlice.reducer
