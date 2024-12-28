import bcrypt from "bcrypt"
import {userCollection} from "../Models/user.model.mjs"
import jwt from "jsonwebtoken"
import env from "dotenv"

env.config()

const signup = async (req, res) => {
    try {
        const { body } = req
        console.log(body)
        body.password = await bcrypt.hash(body.password, 10);
        const response = await userCollection.create(body)
        if (!response?._id) {
            return res.status(400).send({
                message: "Bad Request"
            })
        }
        response.password = null
        const token = jwt.sign({sub: response}, process.env.JWT_KEY, {expiresIn: "7d"})
        return res.status(201).send({
            message: "user created",
            user: response,
            token
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }
}

const login = async (req, res) => {
   try {
    console.log(req.query)
        const { username , password } = req.query
        const user = await userCollection.findOne({username})
        if (!user) {
            return res.status(400).send({
                message: "user does not exist"
            })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            return res.status(400).send({
                message: "invalid credential"
            })
        }
        user.password = null
        const token = jwt.sign({sub: user}, process.env.JWT_KEY, {expiresIn: "7d"})
        return res.status(200).send({
            message: "user loggedin",
            token,
            user
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }
}

const product =async (res, req)=>{
   try {
    const response = await fetch("https://dummyjson.com/products")
    const result = await response.json()
    return res.status(200).send({
        message: "done",
        result
    })
   } catch (error) {
    return res.status(500).send({
        message: err.message || "Internal server error"
    })
   }

}

export default {
    signup,
    login,
    product
}