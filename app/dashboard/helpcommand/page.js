"use client"

import React, { useState, useEffect, useContext } from 'react'
import style from './helpcmd.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import InputBox from '@/components/InputBox/InputBox'
import Button from '@/components/Button/Button'
import MessageBox from '@/components/MessageBox/MessageBox'
import BotMenuCotext from '@/context/botmenu';
import { RQ_Login } from '@/utilise'
import { DeleteHelpCommand, GetHelpCommand, SetHelpCommand } from '@/utilise/api'
import { toast } from 'react-toastify'

export default function page() {
  const [embed, setEmbed] = useState({})
  const [fields, setFields] = useState([])
  const [listfilelds, setListF] = useState([])
  const { inbot, setInbot } = useContext(BotMenuCotext)
  const [helpcmd, setHelpCmd] = useState(null)
  const [r,setR] = useState(false)

  const Delete = async () => {
    const response = await DeleteHelpCommand(localStorage.getItem('bot'));
    if(!response.status){
      setR(!r)
      return toast.error(response.message)
    }
    setR(!r)
    toast.success(response.message)
  }

  const AddFields = () => {
    setFields((prev) => [...prev, { name: "", value: "", inline: false }]);
  };


  const setValue = (index, key, newValue) => {
    setFields((prev) =>
      prev.map((field, i) =>
        i === index ? { ...field, [key]: newValue } : field
      )
    );
  };

  const removeField = (index) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const sendData = async () => {
    const response = await SetHelpCommand(localStorage.getItem('bot'), embed, fields)
    if (!response.status) {
      setR(!r)
      return toast.error(response.message)
    }
    setR(!r)
    toast.success(response.message)
  }

  useEffect(() => {
    (async () => {
      RQ_Login(localStorage.getItem('login'))
      const response = await GetHelpCommand(localStorage.getItem('bot'))
      console.log(response)
      if (!response.status) return setHelpCmd(null)
      setHelpCmd(response.data)
    })()
  }, [inbot,r])

  return (
    <section className={style.help}>
      <div className={style.menu}>
        <Cmenu />
      </div>
      <div className={style.main}>
        <MessageBox />
        <h2>Help Command</h2>
        <p><strong>Command:</strong> <code><span style={{ color: "red" }}>/help</span></code></p>

        {helpcmd ?
          <div className={style.helpcmd}>
            <div>
              <h5>already exists</h5>
              <p>Title: {helpcmd.embed.title}</p>
              <p>Description: {helpcmd.embed.description}</p>
              <p>Color: <span style={{ color:helpcmd.embed.color }}>{helpcmd.embed.color}</span></p>
            </div>
            <div>
              <p>Bot CID: {helpcmd.bot_cid}</p>
              <p>CreatedAt: {helpcmd.createdAt}</p>
              <span onClick={Delete}>
                <Button name='Delete' gbcolor='red' />
              </span>
            </div>
          </div>
          :
          <>
            <div>
              <InputBox title='Title' objType={true} objkey={'title'} placeholder='Embed Title' setValue={setEmbed} />
            </div>
            <div>
              <InputBox title='Description' objType={true} objkey={'description'} placeholder='Embed Description' setValue={setEmbed} />
            </div>
            <div>
              <InputBox title='Title URL' objType={true} objkey={'titleurl'} placeholder='Embed Title URL' setValue={setEmbed} />
            </div>
            <div className={style.box}>
              <h3>Color</h3>
              <input type="color" onChange={(e) => setEmbed(prop => ({ ...prop, color: e.target.value }))} style={{ width: "100px" }} />
            </div>
            <div>
              <InputBox title='Thumbnail URL' objType={true} objkey={'thumbnailurl'} placeholder='Embed Thumbnail URL' setValue={setEmbed} />
            </div>
            <div className={style.box}>
              <h3>Timestamp</h3>
              <select onChange={(e) => setEmbed(prop => ({ ...prop, timestamp: e.target.value === 'true' }))}>
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
            <div>
              <InputBox title='Image URL' objType={true} objkey={'imageurl'} placeholder='Embed Image URL' setValue={setEmbed} />
            </div>

            <h3>Author</h3>

            <div>
              <InputBox title='Name' objType={true} objkey={'authorname'} placeholder='Embed Auther name' setValue={setEmbed} />
            </div>
            <div>
              <InputBox title='Icon URL' objType={true} objkey={'authoricon'} placeholder='Embed Auther Icon URL' setValue={setEmbed} />
            </div>
            <div>
              <InputBox title='URL' objType={true} objkey={'authorurl'} placeholder='Embed Auther URL' setValue={setEmbed} />
            </div>
            <h3>Fields</h3>
            <div>
              {fields.map((field, i) => (
                <div className={style.box} key={i}>
                  <input
                    type="text"
                    placeholder="Fields Name"
                    value={field.name}
                    onChange={(e) => setValue(i, "name", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Fields Value"
                    value={field.value}
                    onChange={(e) => setValue(i, "value", e.target.value)}
                  />
                  <p>Inline</p>
                  <select
                    value={field.inline}
                    onChange={(e) => setValue(i, "inline", e.target.value === "true")}
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                  <button onClick={() => removeField(i)} style={{ height: "40px", width: "140px", backgroundColor: "red", marginTop: "10px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Remove</button>
                </div>
              ))}
            </div>
            <br />
            <span onClick={() => AddFields(listfilelds.length)}>
              <Button name='Add Field' gbcolor='yellow' color='black' />
            </span>

            <h3>Footer</h3>

            <div>
              <InputBox title='Footer Text' objType={true} objkey={'footertext'} placeholder='Embed Footer Tetx' setValue={setEmbed} />
            </div>
            <div>
              <InputBox title='Footer Icon URL' objType={true} objkey={'footericon'} placeholder='Embed Footer Icon' setValue={setEmbed} />
            </div>

            <div style={{ marginTop: "10px" }}>
              <span onClick={sendData}>
                <Button name="Set Command" gbcolor='#14A44D' color='white' />
              </span>
            </div>
          </>}
      </div>
    </section>
  )
}
