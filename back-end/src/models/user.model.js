import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
     fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "charity", "admin"],
    default: "user"
  },
status:{
    type: String,
    default: "active",
},
  isVerified: {
    type: Boolean,
    default: false
  },

  verificationToken: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema);
export default User


