import { model, Schema } from "mongoose"

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "name is required"]
    },
    username:{
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "password is required"]
    }
},
{
    timestamps: true
}
)

export const userCollection = model("users", userSchema)