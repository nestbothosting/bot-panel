"use client";

import React from "react";
import style from "./dropdown.module.css";
import { useRouter } from "next/navigation";

export default function Dropdown() {
    const router = useRouter();

    const handleChange = (e) => {
        if (e.target.value === "addnewbot") {
            router.push("/addnewbot");
        }
    };

    return (
        <div className={style.dropdown}>
            <select id="bot-menu" onChange={handleChange}>
                <option value="none">Bot's!</option>
                <option value="addnewbot">Add New Bot!</option>
            </select>
        </div>
    );
}
