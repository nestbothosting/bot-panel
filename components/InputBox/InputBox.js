import React from 'react'
import style from './MessageBox.module.css'

export default function InputBox({ disabledin = false, title = '', type = 'text', value, setValue, objType = false, objkey = '', placeholder = 'Enter Value', description = '' }) {

  const HandleChange = async (e) => {
    if (objType) {
      setValue(prop => ({ ...prop, [objkey]: e.target.value }))
    } else {
      setValue(e.target.value)
    }
  }

  return (
    <div className={style.box} aria-disabled>
      <h3>{title}</h3>
      <span>{description}</span>
      <input type={type} value={value} onChange={(e) => HandleChange(e)} placeholder={placeholder} disabled={disabledin}/>
    </div>
  )
}
