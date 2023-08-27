import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide Your Username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please Provide Your Email"],
        unique: true
    }
    ,
    password: {
        type: String,
        required: [true, "Please Provide Password"],
    }


})

const User = mongoose.models.users|| mongoose.model(
    "users", UserSchema
);
export default User;
