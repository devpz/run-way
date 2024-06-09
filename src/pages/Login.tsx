import React from "react";
import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, ActionFunctionArgs } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { Store } from "@reduxjs/toolkit";

interface LoginFormData {
  identifier: string;
  password: string;
}

export const action =
  (store: Store) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as LoginFormData;

    try {
      const response = await customFetch.post("/auth/local", data);
      store.dispatch(loginUser(response.data));
      toast.success("logged in successfully");
      return redirect("/");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      return null;
    }
  };

const Login: React.FC = () => {
  const src = "https://run-way.onrender.com/api/public/images/logo.png";
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <img src={src} alt="Logo" className="p-10" />
        <h4 className="text-center text-3xl font-bold">
          Sign in to your account
        </h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="Sign in" />
        </div>

        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
