"use client";

import React, { useEffect, useContext } from 'react';
import { useSearchParams } from "next/navigation";
import UserContext from '@/context/usercontext';
import Cmenu from '@/components/Cmenu/Cmenu';
import style from './dashboard.module.css'

export default function Page() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const uid = searchParams.get("uid");
  const avatar = searchParams.get("avatar");
  const id = searchParams.get("id");

  const { islogin, setLogin } = useContext(UserContext)

  useEffect(() => {
    if (username && uid && avatar && id) {
      const user = { username, uid, avatar, id };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('login', true)
      setLogin(true)
    }
  }, [username, uid, avatar, id]);

  return (
    <div className={ style.dashboard }>
      <div className={ style.Cmenu }>
        <Cmenu />
      </div>
    </div>
  );
}
