import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import ApiError from '../../utils/ApiError.js'
import AsyncHandler from 'express-async-handler'


export const verifyJWT = AsyncHandler(async (req,_,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      try {
        token = req.headers.authorization.split(" ")[1]
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = await User.findById(decodedToken.id).select("-password")
        next()
      } catch (error) {
        throw new ApiError(401 , "Invalid Token access")
      }
    }
    
})

// module.exports = verifyJWT