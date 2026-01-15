import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Profile from './pages/profile'
import Chat from './pages/chat'
import { Children } from 'react'
import { useAppStore } from './store/slices'
import { useEffect } from 'react'
import { useState } from 'react'
import apiClient from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'
import { toast } from 'sonner'

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = !!userInfo
  return isAuthenticated ? children : <Navigate to="/auth" />
}

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = !!userInfo
  return isAuthenticated ? <Navigate to="/chat" /> : children
}
const App = () => {
  const [loading, setLoading] = useState(true)
  const { userInfo, setUserInfo } = useAppStore()
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await apiClient.get(GET_USER_INFO)
        if (res.status === 200 && res.data.id) {
          setUserInfo(res.data)
        } else {
          setUserInfo(undefined)
        }
      } catch (error) {
        const msg = error?.response?.data?.message || 'Error fetching user data'
        console.log(msg)

        toast.error(msg)
        setUserInfo(undefined)
      } finally {
        setLoading(false)
      }
    }

    if (!userInfo) {
      getUserData()
    } else {
      setLoading(false)
    }
  }, [userInfo, setUserInfo])
  if (loading) {
    return <div>Loading.....</div>
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={'/auth'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
