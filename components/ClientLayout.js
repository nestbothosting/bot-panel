"use client"

import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Header from '@/components/Header/Header'
import UserContext from '@/context/usercontext'
import BotMenuContext from '@/context/botmenu'
import Footer from './Footer/Footer'
import AnnouncementBar from './AnnouncementBar/AnnouncementBar'

export default function ClientLayout({ children }) {
  const [islogin, setLogin] = useState(false)
  const [inbot, setInbot] = useState()

  return (
    <UserContext.Provider value={{ islogin, setLogin }}>
        <BotMenuContext.Provider value={{ inbot, setInbot }}>
          <AnnouncementBar />
          <Header />
          {children}
          <Footer />
          <ToastContainer position="top-right" theme="dark" />
        </BotMenuContext.Provider>
    </UserContext.Provider>
  )
}
