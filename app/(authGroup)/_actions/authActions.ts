"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';



// Login 
type LoginState = {
  success: boolean,
  statusCode : number,
  message : string,
  data : {
    accessToken : string,
    refreshToken : string
  }
}

export const loginAction = async (prevState : LoginState , formData: FormData)  => {
  console.log(formData);
  console.log(prevState, "Previous State")
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
 if(result.success){
  const cookieStore = await cookies()
  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly : true,
    maxAge : 60 * 60 * 24 * 7 ,
    sameSite : "lax", 
  })
  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly : true,
    maxAge : 60 * 60 * 24 * 7 ,
    sameSite : "lax", 
  });
  redirect("/dashboard", "replace");

 }
  return result;
};


// Register

type RegisterState = {
  success: boolean,
  statusCode?: number,
  message: string,
  data?: {
    user: {
      id: string,
      name: string,
      email: string,
      role: string,
      [key: string]: string
    }
  }
} | false;

export const registerAction = async (prevState: RegisterState, formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = { name, email, password };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    redirect("/login?registered=true");
  }

  return result;
};