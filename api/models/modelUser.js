import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    img: {
        type: String,
    },
    
    country: {
        type: String,
    },

    city: {
        type: String,
    },

    phone: {
        type: String,
    },

    password: {
        type: String,
        unique: true,
        required: true
    },

    loginCount: {
        type: Number,
        default: 0,
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export default mongoose.model("User", UserSchema);