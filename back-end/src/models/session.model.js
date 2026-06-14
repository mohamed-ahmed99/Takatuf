import mongoose from "mongoose";

// schema
const sessionSchema = new mongoose.Schema({
    // user/account reference
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },

    // token (e.g. JWT token or refresh token)
    token: { type: String, required: true },

    // ip address
    ip: { type: String },

    // status
    status: { type: String, enum: ["active", "revoked"], default: "active" },
    
    // revoked reason
    revokedReason: { type: String },

    // expiresAt
    expiresAt: { 
        type: Date, 
        default:() => new Date( Date.now() + 24 * 60 * 60 * 1000)
    },
    
    // optional user agent
    userAgent: { type: String },

  }, { timestamps: true }
);

// session indexes
sessionSchema.index({ user: 1 });
sessionSchema.index({ token: 1 });

export default mongoose.model("Session", sessionSchema);
