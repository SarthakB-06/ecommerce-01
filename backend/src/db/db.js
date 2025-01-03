import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';


const connectToDb = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`mongodb connected : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error" , error)
        process.exit(1)
    }
}

// yZ9bR30riv2HKgFr
// sarthakbansal725
// 

export default connectToDb;