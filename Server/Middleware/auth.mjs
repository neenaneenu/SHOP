import jwt from "jsonwebtoken"
import env from "dotenv"

env.config()

export const Auth = (req, res, next)=>{
    try {
        const tokenData = req.headers["authorization"]
        const [_,token] = tokenData?.split("")
        const response = jwt.verify(token, process.env.JWT_KEY)
        const currentTime = Math.floor(new Date().getDate() / 1000)
        if (response.exp <= currentTime){
            return res.status(401).send({
                message : "unauthorized"
            })
        }
        next()

        
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            message: "internal server error"
        })
        
    }

}