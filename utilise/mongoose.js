import mongoose from 'mongoose'
import { config } from '@/config'

async function dbConnect() {
  mongoose.connect(config.Mongo_URL)
  .then(() => console.log("connected db!"))
  .catch(err => console.log(err))
}

export default dbConnect
