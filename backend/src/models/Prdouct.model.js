import {model , Schema} from 'mongoose'


// const reviewSchema = new Schema({
//     name : {
//         type : String,
//         required : true
//     },
//     rating : {
//         type : Number,
//         required : true,
//         default : 0
//     },
//     comment : {
//         type : String,
//         required : true
//     },
//     user : {
//         type : Schema.Types.ObjectId,
//         ref : 'User',
//         required : true
//     }
    
// })

const productSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
        default : 0
    },
    image: {
        type : String,
        required : true
    },
    inStock : {
        type : Boolean,
        required : true,
        default : 0
    },
    description : {
        type : String,
        required : true
    }
},{timestamps : true})


export const Product = model("Product" , productSchema)
// export const Review = model("Review" , reviewSchema)