"use client"

import React, { useEffect, useState } from 'react'
import style from './users.module.css'
import Cadmin from '@/components/Cadmin/Cadmin'
import Users from '@/components/Users/Users'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function page() {
  const [users,setUsers] = useState([])

  useEffect(() => {
    const user = localStorage.getItem('user')

    const GetData = async () => {
      const url = window.location.origin
      const UserData = JSON.parse(user)
      const response = await axios.get(`${url}/api/users?id=${UserData.id}`)
      if(!response.data.status) return toast.error(response.data.message);
      setUsers(response.data.users)
    }

    GetData()
  },[])

  return (
    <div className={style.users}>
      <div className={style.menu}>
        <Cadmin />
      </div>
      <div className={style.main}>
        <h1>Users</h1>
        {users.map((user,key) => (
          <Users adminstatus={user.admin} avatar={user.avatar} email={user?.email} uid={user.uid} username={user.username} key={key} />
        ))}
      </div>
    </div>
  )
}
