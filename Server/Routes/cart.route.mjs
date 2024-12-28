import { Router } from "express"
import cartController, {} from "../controllers/cart.controller.mjs"

const cartRoute = Router()

cartRoute.post("/", cartController.addToCart )
cartRoute.get("/get", cartController.getCart)
cartRoute.patch("/patch", cartController.updateCart)
cartRoute.delete("/remove", cartController.removeFromCart)
 

export default cartRoute
