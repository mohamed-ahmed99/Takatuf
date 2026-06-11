import mongoose from "mongoose";

const charitySchema = new mongoose.Schema(
  {
    // account reference
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
      unique: true,
    },

    // charity profile information
    charityName: { type: String, required: true },
    about: {type: String, maxlength: 3000 },

    // establishment date
    establishmentDate: { type: Date, required: true },
    
    // address
    address: {
        governorate: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String }
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

    // contact information
    contactInfo: {
      email: {type: String, required: true},
      phone: {type: String, required: true},
      
      // social media accounts
      socialMedia: [
        {platform: {type: String, required: true}, url: {type: String, required: true}}
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Charity", charitySchema);
