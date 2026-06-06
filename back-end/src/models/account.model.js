import mongoose from "mongoose";

// schema
const accountSchema = new mongoose.Schema({
    // email
    email: { type: String, required: true},

    // password
    password: { type: String, required: true, select: false },

    // role
    role: { type: String, enum:["user", "charity", "system_admin"], required: true, },

    // account type
    accountType: { type: String, enum: ["user", "charity"], required: true },

    // status
    status: { type: String, enum: ["active", "unverified", "banned", "deleted"], default: "unverified" },

    // verification field
    verification: {
      code: { type: String, required: true },
      expiresAt: { type: Date,  default: () => (Date.now() + 10 * 60 * 1000 )},
    },

  },{timestamps: true,}
);

// account indexs
accountSchema.index({email: 1, createdAt: -1});

export default mongoose.model("Account", accountSchema);