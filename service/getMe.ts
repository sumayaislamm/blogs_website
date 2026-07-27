"use server"

import { cookies } from "next/headers"

export const getMe = async () =>{
 const cookieStore = await cookies();

 const accessToken = cookieStore.get('accessToken')?.value;
  if (!accessToken){
    // throw new Error ("User not Logged in!")
    return {
        success : false,
        message : "User Not Logged in!"
    }
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
    headers :{
        // Authorization : accessToken as unknown as string,
        Authorization : `${accessToken}`,

    }
  });
  const result = res.json(); 
  console.log (result);
  return result;
}