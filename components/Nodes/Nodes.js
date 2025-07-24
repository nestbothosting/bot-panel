import React from 'react'
import style from './Nodes.module.css'
import { FcAcceptDatabase, FcDeleteDatabase } from "react-icons/fc";
import { RiExternalLinkLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function Nodes({ status = false, node_id = '0000000000', node_url = 'http://localhost:3001', node_cid = '', path='' }) {
    const router = useRouter();

    const BotsPage = (node_cid) => {
        router.push(`/admin/${path}/${node_cid}`);
    };

    return (
        <div className={style.Nodes}>
            <div className={style.statuslogo}>
                {status ? <FcAcceptDatabase size={30} /> : <FcDeleteDatabase size={30} />}
            </div>
            <div className={style.main}>
                <span>{node_url}</span>
                <span>{node_id}</span>
                {status ? <span style={{ color: "green" }}>Online</span> : <span style={{ color: "red" }}>Offline</span>}
            </div>
            <div className={style.link}>
                <span style={{ cursor: "pointer" }} onClick={() => BotsPage(node_cid)}>
                    <RiExternalLinkLine size={20} />
                </span>
            </div>
        </div>
    )
}
