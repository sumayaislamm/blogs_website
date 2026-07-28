"use server"

import jwt from "jsonwebtoken";


const verifyToken = async (token : string, secret : string) => {
   try {
        const verifiedToken = jwt.verify(token, secret);
        return {
            success: true,
            data: verifiedToken
        };
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (error : any ) {
        console.log("Token verification failed:", error);
        return { 
            success: false,
            error : error.message
        }
   }
}


export const jwtUtils = {
    verifyToken
}