"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const users: any = localStorage.getItem("users") || "[]";
  const [isValid, setValid] = useState<any>(false);
  const [u, setU] = useState<any>([]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  useEffect(() => {
    const user: any = localStorage.getItem("currUser");
    if (user) {
      router.push("/");
    } else {
      setU(JSON.parse(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik: any = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      if (auth(values.email, values.password)) {
        console.log("login successfully");
        router.push("/");
      } else {
        console.log("invalid");
        setValid(true);
        localStorage.removeItem("currUser");
      }
    },
  });

  const auth = (email: any, password: any) => {
    const u = JSON.parse(users);
    const user = u.find(
      (user: any) =>
        user.email === email && user.password === password && user.isAdmin
    );
    localStorage.setItem("currUser", JSON.stringify(user));
    return !!user;
  };
  return (
    <form
      className="max-w-md mx-auto border border-gray-900 p-8 rounded-lg bg-white w-full mt-[120px]"
      style={{ boxShadow: "5px 5px 50px" }}
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-3xl font-bold text-center my-3">Login</h1>
      {isValid && (
        <div className="text-red-500 text-sm mt-1">
          *email or password is invalid
        </div>
      )}
      <div className="relative z-0 w-full mb-5 group">
        <label>Email address</label>
        <input
          type="text"
          id="email"
          name="email"
          className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none ${
            formik.errors.email
              ? "border-red-500"
              : "focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          }`}
          placeholder="Please enter email"
          autoComplete="off"
          {...formik.getFieldProps("email")}
        />
        {formik.errors.email && formik.touched.email && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none ${
            formik.errors.password
              ? "border-red-500"
              : "focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          }`}
          placeholder="Please enter password"
          autoComplete="new-password"
          {...formik.getFieldProps("password")}
        />
        {formik.errors.password && formik.touched.password && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.password}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login
      </button>
      <Link href="/register" className="text-blue-900">
        Not a account
      </Link>
    </form>
  );
};

export default Login;
