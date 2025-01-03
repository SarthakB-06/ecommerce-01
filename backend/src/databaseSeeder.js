import { Router } from "express";
import { Product } from "./models/Prdouct.model.js";
import products from "./data/Products.js";
import AsyncHandler from 'express-async-handler'


const router = Router()
router.get("/products", 
    AsyncHandler(async (req, res) =>{
        await Product.deleteMany({})
        const ProductSeeder = await Product.insertMany(products)
        res.send({ProductSeeder})
    })
)


export default router;