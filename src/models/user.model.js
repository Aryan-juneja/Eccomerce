import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
        maxlength: [20, "name must be less than 20 characters"],
        minlength: [3, "name must be greater than 3 characters"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
        unique: true,
    },
    password: {
        type: String,
        minlength: [8, "password must be greater than 8 characters"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    image:{
        type:String,
        default:"https://res.cloudinary.com/dxqzjxq7j/image/uploadv1628724389/avatars/blank-profile-picture-973460_640_1_1_1.png"        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    verifycode: {
        type: String,
    },
    verifystatus: {
        type: Boolean,
        default: false
    },
    googleid:{
        type: String,
    }
})
const userModel =mongoose.models.User || mongoose.model("User",userSchema);
export default userModel