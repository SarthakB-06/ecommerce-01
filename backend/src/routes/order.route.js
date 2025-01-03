import { Router } from "express";
import { paymentStatus, UserOrder } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import AsyncHandler from "express-async-handler";
import { Order } from "../models/order.model.js";

const router = Router();

router.route("/user-order").post(verifyJWT , UserOrder)
router.route("/:id/payment").patch(verifyJWT , paymentStatus)
router.route("/").get(verifyJWT , AsyncHandler(async (req,res)=>{
    const userOrders = await Order.find({user: req.user._id}).sort({_id:-1})
    if(!userOrders){
        throw new Error("No orders found")
    }
    return res.status(200).json({
        success: true,
        userOrders
    })
 
    
}))
router.route("/:id").get(verifyJWT , AsyncHandler(async (req,res)=>{

    const order = await Order.findById(req.params.id).populate("user" , "email")
    if(!order){
        throw new Error("Order not found")
    }
    return res.status(200).json({
        success: true,
        order
    })
}))


export default router;
