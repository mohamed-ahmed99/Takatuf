import mongoose from "mongoose";

// schema
const accountSchema = new mongoose.Schema({
    // full name
    fullName: { type: String, required: true },

    // email
    email: { type: String, required: true},

    // password
    password: { type: String, required: true, select: false },

    // role
    role: { type: String, enum:["user", "charity", "system_admin"], default: "user"},

    // account type
    accountType: { type: String, enum: ["user", "charity"], default: "user" },

    // status
    status: { type: String, enum: ["active", "unverified", "banned", "deleted"], default: "unverified" },

    // verification field
    verification: {
      verificationCode: { type: String, required: true },
      expiresAt: { type: Date,  default: () => (Date.now() + 10 * 60 * 1000 )},
    },

  },{timestamps: true,}
);

// account indexs
accountSchema.index({email: 1, createdAt: -1});

export default mongoose.model("Account", accountSchema);