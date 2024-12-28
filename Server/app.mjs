import express from "express"
import env from "dotenv"
import cors from "cors"
import dbConnect from "./config/db.config.mjs"
import cartRoute from "./Routes/cart.route.mjs"
import userRoute from "./Routes/user.route.mjs"

env.config()

await dbConnect()

const app = express()

app.use(express.json())

app.use(cors())

app.use("/api/users", userRoute)
app.use("/api/cart",cartRoute )

app.listen(process.env.PORT || 8081, err => {
    if (err) {
        return process.exit(1)
    }
    console.log("Port running on 8081...")

})





