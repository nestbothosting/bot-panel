'use client';

import React from "react";
import style from "./cadmin.module.css";
import { FaServer, FaUsers } from "react-icons/fa";
import { LuBotMessageSquare } from "react-icons/lu";
import { RiBaseStationLine } from "react-icons/ri";
import { IoReorderThree } from "react-icons/io5";
import Link from "next/link";
import { showcadmin } from '@/utilise/index'


export default function Cadmin() {
    return (
        <>
            <div className={style.micon}>
                <IoReorderThree size='35' style={{ cursor:"pointer"}}  onClick={showcadmin} />
            </div>
            <div className={style.cadmin} id="cadmin">
                <div className={style.item}>
                    <div className={style.icon}>
                        <FaServer size={20} color="DarkCyan" />
                    </div>
                    <div className={style.name}>
                        <Link href="/admin/node">Node's</Link>
                    </div>
                </div>

                <div className={style.item}>
                    <div className={style.icon}>
                        <FaUsers size={20} />
                    </div>
                    <div className={style.name}>
                        <Link href="/admin/users">User's</Link>
                    </div>
                </div>

                <div className={style.item}>
                    <div className={style.icon}>
                        <LuBotMessageSquare size={20} />
                    </div>
                    <div className={style.name}>
                        <Link href="/admin/bots">Bot's</Link>
                    </div>
                </div>

                <div className={style.item}>
                    <div className={style.icon}>
                        <RiBaseStationLine size={20} />
                    </div>
                    <div className={style.name}>
                        <Link href="/admin/onlinebots">Online Bot's</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
