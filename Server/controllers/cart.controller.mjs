import { cartCollection } from "../Models/cart.model.mjs";
import env from "dotenv"

env.config();

const addToCart = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;

        console.log(user_id, product_id)

        if (!user_id || !product_id) {
            return res.status(400).send({
                message: "Bad Request. Missing required fields."
            });
        }

        
        let cart = await cartCollection.findOne({ userId: user_id, productId: product_id });

        if (!cart) {
           
            await cartCollection.create({ userId: user_id, productId: product_id });
            return res.status(201).send({
                message: "Item added to cart",
                
            });
        }

       
        const response = await cartCollection.updateOne({ userId: user_id, productId: product_id },{$inc: {quantity: 1}})

        if(response.matchedCount == 1 && response.modifiedCount == 1){
            return res.status(200).send({
                message: "Item updated",
                
            });
        }

        return res.status(200).send({
            message: "No changes",
            
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: err.message || "Internal server error"
        });
    }
};

const getCart = async (req, res) => {
    try {
        const { userId } = req.query

        if (!userId) {
            return res.status(400).send({
                message: "Bad Request. Missing userId."
            })
        }

        const cart = await cartCollection.findOne({ userId }).populate("items.productId")

        if (!cart) {
            return res.status(404).send({
                message: "Cart not found"
            })
        }

        return res.status(200).send({
            message: "Cart retrieved successfully",
            cart
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body

        if (!userId || !productId || typeof quantity !== "number") {
            return res.status(400).send({
                message: "Bad Request. Missing required fields."
            })
        }

        const cart = await cartCollection.findOne({ userId })
        if (!cart) {
            return res.status(404).send({
                message: "Cart not found"
            })
        }

        const itemIndex = cart.items.findIndex(item => item.productId === productId);
        if (itemIndex > -1) {
            if (quantity <= 0) {
                
                cart.items.splice(itemIndex, 1)
            } else {
           
                cart.items[itemIndex].quantity = quantity
            }
        } else {
            return res.status(404).send({
                message: "Product not found in cart"
            })
        }

        await cart.save();

        return res.status(200).send({
            message: "Cart updated successfully",
            cart
        })
    } catch (err) {
        console.error(err.message)
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body

        if (!userId || !productId) {
            return res.status(400).send({
                message: "Bad Request. Missing required fields."
            })
        }

        const cart = await cartCollection.findOne({ userId })
        if (!cart) {
            return res.status(404).send({
                message: "Cart not found"
            })
        }

        cart.items = cart.items.filter(item => item.productId !== productId)
        await cart.save();

        return res.status(200).send({
            message: "Item removed from cart",
            cart
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }
}

export default {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
}
