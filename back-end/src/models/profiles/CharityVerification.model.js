import mongoose from "mongoose";

const charityVerificationSchema = new mongoose.Schema(
  {
    // account reference
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
      unique: true,
    },

    // person who is responsible for the charity
    representative: {
      fullName: { type: String, required: true }, 
      nationalId: { type: String, required: true }, // national id
      phone: { type: String, required: true },
      email: { type: String, required: true },

      // position in charity
      position: { type: String, required: true },
    },

    // charity legal information
    legalInfo: {
      registrationNumber: { type: String, required: true, unique: true }, // registration number
      taxNumber: { type: String }, // optional
      
      // verification document 
      verificationDocument: {
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    rejectionReason: { type: String, default: "" },


    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },

    verifiedAt: {
        type: Date,
        default: () => new Date().toISOString(),
    },
  },
  { timestamps: true }
);

export default mongoose.model("CharityVerification", charityVerificationSchema);
