import mongo from './mongoose'
import usermd from './usermd'

export const GetUserData = async (id) => {
    try {
        await mongo()

        const admin = await usermd.findById(id)
        if(!admin.admin) return { status:false, message:"Admins Only!" }

        const users = await usermd.find()
        return { status:true, users }
    } catch (error) {
        console.log(error.message)
        return { status:false, message:error.message }
    }
}