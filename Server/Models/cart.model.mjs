import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({  
    
        userId:{
            type: mongoose.Types.ObjectId,
            required:true
        },
        productId:{
            type: Number,
            require: true
        },
        quantity:{
            type: Number,
            default: 1
        }
       
    },
    {
        timestamps: true
    }
    )


export const cartCollection = mongoose.model("carts", CartSchema);
