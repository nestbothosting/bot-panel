import React from 'react'
import style from './cmenu.module.css'
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline, IoDiamondOutline, IoTicketOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { ImEmbed } from "react-icons/im";
import { TbBrandMinecraft, TbTimeDuration5 } from "react-icons/tb";
import { GrYoutube } from "react-icons/gr";
import { FaUserCheck, FaUserMinus, FaDiscord, FaUsers } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { VscThreeBars } from "react-icons/vsc";
import { showcmenu } from '@/utilise/index'
import { RiUserSettingsLine } from "react-icons/ri";

import Link from 'next/link';
import Dropdown from '../Dropdown/Dropdown';

export default function Cmenu() {
  return (
    <>
      <div className={ style.scmenu }>
        <VscThreeBars size={30} style={{ cursor:'pointer'}} onClick={showcmenu}/>
      </div>
      <div className={style.Cmenu} id='cmenu'>
        <Dropdown />
        <span className={style.span}>Settings</span>

        <div className={style.items}>
          <div className={style.icon}>
            <LuLayoutDashboard size={20} />
          </div>
          <div className={style.link}>
            <Link href='/dashboard'>Dashboard</Link>
          </div>
        </div>

        <div className={style.items}>
          <div className={style.icon}>
            <FaDiscord  size={20} />
          </div>
          <div className={style.link}>
            <Link href='/dashboard'>Add Bot</Link>
          </div>
        </div>

        <div className={style.items}>
          <div className={style.icon}>
            <IoSettingsOutline size={20} />
          </div>
          <div className={style.link}>
            <Link href='/settings'>Settings</Link>
          </div>
        </div>

        <div className={style.items}>
          <div className={style.icon}>
            <MdOutlineErrorOutline size={20} />
          </div>
          <div className={style.link}>
            <Link href='/botlog'>Bot Log's</Link>
          </div>
        </div>

        <div className={style.items}>
          <div className={style.icon}>
            <IoDiamondOutline size={20} color='rgb(157, 78, 221)' />
          </div>
          <div className={style.link}>
            <Link href='/premium'>Premium</Link>
          </div>
        </div>

        <div className={style.items}>
          <div className={style.icon}>
            <HiStatusOnline size={20} />
          </div>
          <div className={style.link}>
            <Link href='/botstatus'>Bot Status</Link>
          </div>
        </div>

        <span className={style.span}>Server Management</span>

        <div className={style.items}>
          <div className={style.icon}>
            <IoTicketOutline size={20} />
          </div>
          <div className={style.link}>
            <Link href='/dashboard/ticket'>Ticket System</Link>
          </div>
        </div>

        <div className={style.items}>
          <div className={style.icon}>
            <ImEmbed size={20} />
          </div>
          <div className={style.link}>
            <Link href='/dashboard/embed'>Embed Message</Link>
          </div>
        </div>

        <div className={style.items}>
          <div className={style.icon}>
            <TbBrandMinecraft size={20} />
          </div>
          <div className={style.link}>
            <Link href='/dashboard/mcstatus'> Mc Server Status</Link>
          </div>
        </div>

        <div className={style.items}>
          <div className={style.icon}>
            <GrYoutube size={20} color='red' />
          </div>
          <div className={style.link}>
            <Link href='/dashboard/ytnotification'> YT Notification</Link>
          </div>
        </div>

        <div className={style.items}>
          <div className={style.icon}>
            <TbTimeDuration5 size={20} />
          </div>
          <div className={style.link}>
            <Link href='/dashboard/timedmessage'> Timed Message</Link>
          </div>
        </div>

        <div className={style.items}>
          <div className={style.icon}>
            <FaUserCheck size={20} />
          </div>
          <div className={style.link}>
            <Link href='/dashboard/welcomemessage'> Welcome Message</Link>
          </div>
        </div>

        <div className={style.items}>
          <div className={style.icon}>
            <FaUserMinus size={20} />
          </div>
          <div className={style.link}>
            <Link href='/dashboard/leavemessage'> Leave Message</Link>
          </div>
        </div>

        <div className={style.items}>
          <div className={style.icon}>
            <RiUserSettingsLine size={20} />
          </div>
          <div className={style.link}>
            <Link href='/dashboard/autoroleadd'> Auto Role</Link>
          </div>
        </div>

      </div>
    </>
  )
}
