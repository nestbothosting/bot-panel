"use client"

import React, { useEffect, useState } from 'react'
import style from './users.module.css'
import Cadmin from '@/components/Cadmin/Cadmin'
import Users from '@/components/Users/Users'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { isAdmin, RQ_Login } from '@/utilise'
import { GetUsersInfo } from '@/utilise/apis'

export default function page() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user')
    RQ_Login(localStorage.getItem('login'))
    isAdmin(user, router)

    const GetData = async () => {
      const response = await GetUsersInfo(page)
      console.log(response)
      if (!response.status) return toast.error(response.message);
      setLoading(false)
      setUsers(response.users)
    }

    GetData()
  }, [])

  const Plus = async () => {
    setLoading(true)
    const nextPage = page + 1;
    setPage(nextPage);
    const response = await GetUsersInfo(page)
    if (!response.status) return toast.error(response.data.message);
    setLoading(false)
    setUsers(response.users);
  };


  const Minus = async () => {
    if (page === 1) return;
    setLoading(true)
    const prevPage = page - 1;
    setPage(prevPage);
    const response = await GetUsersInfo(page)
    if (!response.status) return toast.error(response.message);
    setLoading(false)
    setUsers(response.users);
  };

  return (
    <section className={style.users}>
      <div className={style.menu}>
        <Cadmin />
      </div>
      <main className={style.main}>
        <h1>Users</h1>

        {users.map((user, key) => (
          <Users adminstatus={user.admin} avatar={user.avatar} email={user?.email} uid={user.dcuid} username={user.username} key={key} />
        ))}

        <p style={{ textAlign: "center" }}>{loading ? "Loading..." : ""}</p>

        <div className={style.morebtns}>
          <button onClick={Minus} style={{ marginRight: "10px" }}><MdArrowBackIos size={19} /></button>
          <button onClick={Plus} ><MdArrowForwardIos size={19} /></button>
        </div>

      </main>
    </section>
  )
}
