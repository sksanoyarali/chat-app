import React, { useState } from 'react'
import Background from '@/assets/login2.png'
import Victory from '@/assets/victory.svg'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'
import apiClient from '../../lib/api-client.js'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '../../utils/constants'
import { useAppStore } from '../../store/slices/index.js'
const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cnfPassword, setCnfPassword] = useState('')
  const navigate = useNavigate()
  const { setUserInfo } = useAppStore()
  const validateSignup = () => {
    if (!email.length) {
      toast.error('Email is required')
      return false
    }
    if (!password.length) {
      toast.error('Password is required')
      return false
    }
    if (password !== cnfPassword) {
      toast.error('Password and confirm password should be same')
      return false
    }
    return true
  }
  const validateLogin = () => {
    if (!email.length) {
      toast.error('Email is required')
      return false
    }
    if (!password.length) {
      toast.error('Password is required')
      return false
    }
    return true
  }
  const handleLogin = async () => {
    if (!validateLogin()) return

    try {
      const response = await apiClient.post(LOGIN_ROUTE, { email, password })

      toast.success(response.data.message)
      setUserInfo(response.data.user)
      if (response.data.user.profileSetup) {
        navigate('/chat')
      } else {
        navigate('/profile')
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'

      toast.error(message)
    }
  }

  const handleSignup = async () => {
    if (!validateSignup()) return

    try {
      const res = await apiClient.post(SIGNUP_ROUTE, { email, password })

      toast.success(res.data.message)
      setUserInfo(res.data.user)
      navigate('/profile')
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed'

      toast.error(message)
      console.error(error)
    }
  }

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[100vh] bg-white border-2 border-white text-opacity-90   shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="victory-image" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with best chat app
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold
                   data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold
                   data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col gap-5 mt-19">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6 "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="flex flex-col gap-5">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6 "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6 "
                  value={cnfPassword}
                  onChange={(e) => setCnfPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center ">
          <img src={Background} alt="background image" className="h-[700px]" />
        </div>
      </div>
    </div>
  )
}

export default Auth
