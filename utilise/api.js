import mongo from './mongoose'
import NodeModel from './nodemd'

export async function SaveNode(key,url){
    try {
        await mongo()
        const NewNode = new NodeModel({
            apikey:key,
            nodeurl:url
        })
        await NewNode.save()
        console.log("Save New Node")
    } catch (error) {
        console.log(error)
    }
}