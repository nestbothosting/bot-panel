// utilise/usermd.js
import mongoose, { Schema } from 'mongoose'

const AnnouncementModel = new Schema({
  message: { type:Array },
})

const Announcement = mongoose.models?.announcement || mongoose.model("announcement", AnnouncementModel)

export default Announcement;