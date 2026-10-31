import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  email: string
  username: string
  token: string
  isInitialized: boolean
}

const initialState: initialStateType = {
  email: '',
  username: '',
  token: '',
  isInitialized: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
      localStorage.setItem('email', action.payload)

      state.username = action.payload.split('@')[0]
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    },
    clearUserData: (state) => {
      state.email = ''
      state.username = ''
      state.token = ''
      localStorage.removeItem('email')
      localStorage.removeItem('token')
    },
    setUserInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
    },
  },
})

export const { setUserEmail, setToken, clearUserData, setUserInitialized } =
  userSlice.actions
export const userSliceReducer = userSlice.reducer
