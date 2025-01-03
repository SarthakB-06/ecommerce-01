import {model , Schema} from 'mongoose'

const orderSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    orderItems : [
        {
            product : {
                type : Schema.Types.ObjectId,
                ref : 'Product',
                required : true
            },
            quantity : {
                type : Number,
                required : true
            },
            price : {
                type : Number,
                required : true
            },
            image:{
                type : String,
                required : true
            },
            name:{
                type : String,
                required : true
            }
        }
    ],
    shippingAddress : {
        address : {
            type : String,
            required : true
        },
        city : {
            type : String,
            required : true
        },
        postalCode : {
            type : String,
            required : true
        },
        country : {
            type : String,
            required : true
        }
    },
    totalAmount : {
        type : Number,
        required : true
    },
    paymentMethod : {
        type : String,
        required : true,
        default : 'PayPal'
    },
    paymentResult :{
        id : {
            type : String,
        },
        status : {
            type : String,
        },
        update_time : {
            type : String,
        },
        email_address : {
            type : String,
        }
    },
    shippingPrice : {
        type : Number,
        required : true,
        default : 0
    },
    isPaid : {
        type : Boolean,
        required : true,
        default : false
    },
    paidAt : {
        type : Date 
    },
    isDelivered : {
        type : Boolean,
        required : true,
        default : false
    },
    deliveredAt : {
        type : Date
    }
},{timestamps : true})

export const Order = model('Order', orderSchema)