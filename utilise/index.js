import { useContext } from 'react'
import UserContext from '@/context/usercontext'
import { config } from '@/config'
import mongo from './mongoose'
import UserModel from './usermd'


export function DiscordAUth() {
    window.location.href = config.AuthURL
}

export function LogOut(setLogin) {
    localStorage.clear();
    setLogin(false);
}
  
export async function SaveUser(userdata){
    try {
        mongo()

        const { id, username, avatar, email} = userdata;
        const user = await UserModel.findOne({ uid:id })
        if(user){
            return { status:true, message:"successfully logged in", user}
        }
        const data = {
            uid:id,
            username,
            avatar
        }
        if(email){
            data.email = email
        }
        const NewUser = new UserModel(data)
        
        await NewUser.save()

        return { status:true, message:"new user created!", user:NewUser }
    } catch (error) {
        console.log(error)
        return { status:true, message:error.message }
    }
}

export function showicon(e){
    const resnav = document.getElementById('nav-items')
    resnav.style.display = 'block'
}

export function RQ_Login(islogin){
    if(!islogin){
        DiscordAUth()
    }
}

export function showcmenu(){
    const Cmenu = document.getElementById('cmenu')
    Cmenu.style.display = 'block'
}

export function showcadmin(){
    const cadmin = document.getElementById('cadmin')
    cadmin.style.display = 'block'
}