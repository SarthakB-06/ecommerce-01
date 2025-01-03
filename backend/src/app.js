import express from 'express';

const app =  new express();


app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


import userRouter from './routes/user.route.js'
import productRouter from './routes/product.route.js'
// import databaseSeeder from './databaseSeeder.js'
import databaseSeeder from './databaseSeeder.js'
import orderRoute from './routes/order.route.js'


app.use("/api/seed" , databaseSeeder)
app.use("/api/products" , productRouter)
app.use("/api/orders" , orderRoute)
app.use("/api/users" , userRouter);




export default app