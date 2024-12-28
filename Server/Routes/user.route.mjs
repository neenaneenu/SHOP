import { Router } from "express"
import userController from "../controllers/user.controller.mjs"
import { Auth } from "../Middleware/auth.mjs"

const userRoute = Router()

userRoute.post("/signup", userController.signup)
userRoute.get("/login",  userController.login)
userRoute.get("/product", Auth, userController.product)

export default userRoute
