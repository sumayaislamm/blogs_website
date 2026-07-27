"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerAction } from "../_actions/authActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, false);
  console.log(state, "State this one");
  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "User Login Successfully!");
    }
    if (!state.success) {
      toast.error(state.message || "Login Failed, Try Again!");
    }
  }, [state]);
  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input
          name="name"
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
        <Button type="submit" disabled={pending}>
          {" "}
          {pending ? "Submitting...." : "Register"}
        </Button>
        <p className="items-center justify-center text-xs mx-auto mt-[-10]">
          Already have an account?{" "}
          <Link href={"/login"} className="text-primary">
            Go for Login
          </Link>{" "}
        </p>
      </Card>
    </form>
  );
};

export default RegisterForm;
