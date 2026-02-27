import React from 'react'
import { useSelector } from "react-redux"

const ProfileUi = () => {
  const user = useSelector((state) => state.auth.user)

  if (!user) {
    return <h1>Please Login</h1>
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <h1>{user.email}</h1>
      <img src={user.image} alt="" />
    </div>
  )
}

export default ProfileUi