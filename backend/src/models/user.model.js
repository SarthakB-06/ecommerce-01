import {model , Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    } ,
    isAdmin : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

userSchema.pre("save", async function(next){
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10)
    return next()
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}



export const User = model("User" , userSchema)