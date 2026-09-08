import LoginForm from "../_components/LoginForm";



const loginPage = () => (
  <>
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        {/* Form Text  */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
       
        </div>

        {/* Form  */}
        <LoginForm />
      </div>
    </div>
  </>
);

export default loginPage;
