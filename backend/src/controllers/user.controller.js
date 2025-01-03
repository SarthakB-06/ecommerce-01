// import asyncHandler from "../../utils/asyncHandler";
import AsyncHandler from 'express-async-handler'
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import ApiError from '../../utils/ApiError.js';
import ApiResponse from '../../utils/ApiResponse.js';
import { generateToken } from '../generateToken.js';
import { Product } from '../models/Prdouct.model.js';
import { Order } from '../models/order.model.js';


const registerUser = AsyncHandler(async (req,res)=>{
    const { name, email, password } = req.body;

    if ([name, email, password].some(
        (field) => ( field?.trim() === "" )
    )) {
        throw new ApiError(400, "All fields are required")
    }
    const existUser = await User.findOne({email})

    if(existUser){
        throw new ApiError(400, "User already exists")
    }
    const user = await User.create({
        name,
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!user){
        throw new ApiError(500, "Failed to register user")
    }
    return res.status(200).json(
        new ApiResponse(201,
            {
                user : createdUser,
            },
            "User registered successfully"
        )
    )
})


const loginUser = AsyncHandler(async (req,res)=>{
    const { email, password } = req.body;

    if(!email){
        throw new ApiError(400 , "Email is required")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(401 , "user does not exist")
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        throw new ApiError(401 , "Invalid email or password")
    }


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const token =   generateToken(user._id)

    return res.status(200).json(
        new ApiResponse(200,
            {
                user : loggedInUser,token
            },
            "User logged in Successfully"
        )
    )
})

const getProfile = AsyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id).select("-password -refreshToken")
    if(!user){
        throw new ApiError(401, "User not found")
    }
    return res.status(200).json(
        new ApiResponse(200,
            {
                user
            },
            "User profile retrieved successfully"
        )
    )
})

const updateProfile = AsyncHandler(async (req,res)=>{
    const {name , email} =  req.body
    if (!name || !email) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                name,
                email
            }
        },
        { new: true }
    ).select("-password -refreshToken");
    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Account details updated successfully")
        )
})
const changeCurrentPassword = AsyncHandler(async (req,res)=>{
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findById(req.user._id);
    const isPasswordCorrect = await user.comparePassword(currentPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid current password");
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {}, "Password changed successfully")
    );
})
const getProducts = AsyncHandler(async (req,res)=>{
    const products = await Product.find({})
    return res.status(200).json(
        new ApiResponse(200, products, "Products retrieved successfully")
    )
})
const getProductById = AsyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        throw new ApiError(404, "Product not found")
    }
    return res.status(200).json(
        new ApiResponse(200, product, "Product retrieved successfully")
    )
})

const UserOrder = AsyncHandler(async (req,res)=>{
    const {orderItems , shippingAddress , paymentMethod , totalAmount} = req.body

    if(!Array.isArray(orderItems) || orderItems.length === 0){
        throw new ApiError(400, "Products array is required and must not be empty")
    }
    // if(!orderItems || !shippingAddress || !paymentMethod || !totalAmount){
    //     throw new ApiError(400, "All fields are required")
    // }
    const user = await User.findById(req.user._id)
    const order = await Order.create({
        user: user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalAmount
    })
    const createdOrder = await order.save();
    return res.status(201).json(
        new ApiResponse(201, createdOrder, "Order placed successfully")
    )
})


const paymentStatus = AsyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        throw new ApiError(404, "Order not found")
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address
    }
    const updatedOrder = await order.save();
    return res.status(200).json(
        new ApiResponse(200, updatedOrder, "Payment status updated successfully")
    )  
})
export { registerUser ,loginUser  , getProfile , updateProfile , changeCurrentPassword , getProducts , getProductById , UserOrder , paymentStatus}