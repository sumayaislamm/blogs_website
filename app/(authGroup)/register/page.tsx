import React from "react";
import RegisterForm from "../_components/RegisterForm";

const registerPage = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
          {/* Form Text  */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Hello, Grettings from us!</h1>
            <p className="text-gray-500">
              Enter your credentials to create your account
            </p>
          </div>

          {/* Form  */}
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </>
  );
};

export default registerPage;
