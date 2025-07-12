"use clinet"

import React from 'react'
import style from './Users.module.css'
import Image from 'next/image'

export default function Users({ uid='000000000000', username='username', avatar='', email='no email', adminstatus=false }) {
  return (
    <div className={ style.userscontainer }>
      <div className={ style.avatar }>
        <Image  src={`https://cdn.discordapp.com/avatars/${uid}/${avatar}.png`} alt='Avatar!' width={70} height={70} style={ adminstatus? {border:"1px solid red"} : {border:"1px solid white"} }/>
      </div>
      <div className={ style.data }>
        <p>{username}</p>
        <p>{email}</p>
        <p>UID: {uid}</p>
      </div>
    </div>
  )
}
