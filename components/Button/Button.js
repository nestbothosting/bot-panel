'use client';

import React from 'react'
import style from './Button.module.css'

const Change = async (e) => {
  const buttonName = e.target.innerText;
  e.target.innerText = "loading.."
  setTimeout(() => {
    e.target.innerText = buttonName
  },6000)
  
}

export default function Button({ name='click', color, gbcolor, border }) {
    if(!border){
        border = 'none'
    }
  return (
    <button onClick={(e) => Change(e)} style={{ color:color, backgroundColor:gbcolor, border:border }} className={ style.btn }>{name}</button>
  )
}
