import mongoose from "mongoose";

// schema
const profileSchema = new mongoose.Schema({
    // account reference
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
        index: true,
        unique: true,
    },

    // full name
    fullName: { type: String, required: true },

    // phone number
    phoneNumber: { type: String, },

    // date of birth
    dateOfBirth: { type: Date},

    // gender
    gender: { type: String, enum: ["male", "female"], required: true },

    // address
    address: {
        governorate: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String}
    },

    // profile image
    profileImage: {
        url: { type: String },
        id: { type: String },
    },
    
    // cover image
    coverImage: {
        url: { type: String },
        id: { type: String },
    },

  },{timestamps: true,}
);


export default mongoose.model("User", profileSchema);