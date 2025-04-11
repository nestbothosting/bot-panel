'use client';

import React from 'react'
import style from './Button.module.css'

export default function Button({ name, color, gbcolor, border }) {
    if(!border){
        border = 'none'
    }
  return (
    <button style={{ color:color, backgroundColor:gbcolor, border:border }} className={ style.btn }>{name}</button>
  )
}
