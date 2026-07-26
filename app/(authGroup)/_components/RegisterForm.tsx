import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const RegisterForm = () => {
  return (
    <form className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input
          name="username"
          type="text"
          placeholder="Enter Your Name Here"
          required
        ></Input>
        <Input
          name="email"
          type="email"
          placeholder="Enter Your Email Here"
          required
        ></Input>
        <Input
          name="password"
          type="password"
          placeholder="Enter Your Password Here"
          required
        ></Input>
        <Button type="submit">Login</Button>
      </Card>
    </form>
  );
};

export default RegisterForm;
