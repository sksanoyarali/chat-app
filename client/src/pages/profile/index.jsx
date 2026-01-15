import React from 'react'
import { useAppStore } from '../../store/slices'

const Profile = () => {
  const { userInfo } = useAppStore()
  return <div> profile: {userInfo.email} </div>
}

export default Profile
