"use server";


// Login 
type LoginState = {
  success: true,
  statusCode : number,
  message : string,
  data : {
    accessToken : string,
    refreshToken : string
  }
}

export const loginAction = async (prevState : LoginState , formData: FormData) => {
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
  console.log(result);
  return result;
};


// Register 

export const registerAction = async ( formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    name,
    email,
    password,
  };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Registration failed:", error);
    return { success: false, message: "Registration request failed" };
  }
};