// utilise/usermd.js
import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  uid: String,
  username: String,
  avatar: String,
  email: String,
  admin: { type: Boolean, default: false }
})

const User = mongoose.models?.users || mongoose.model("users", UserSchema)

export default User
