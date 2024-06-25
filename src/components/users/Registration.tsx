"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Registration = ({ params = "" }: any) => {
  const router = useRouter();
  const users: any = localStorage.getItem("users") || "[]";
  const [u, setU] = useState<any>([]);
  const [user, setUser] = useState<any>({
    isAdmin: false,
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repeat_password: "",
    phone: "",
    address: "",
    about: "",
  });
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    repeat_password: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Please confirm your password"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    about: Yup.string().required("About field is required"),
  });
  useEffect(() => {
    const user: any = localStorage.getItem("currUser");
    if (user) {
      if (params) {
        const userArr = JSON.parse(users);
        const selectedUser = userArr.filter(
          (user: any) => user.username === params
        );
        setUser(selectedUser[0]);
        return;
      }
      router.push("/");
    } else {
      setU(JSON.parse(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const formik: any = useFormik({
    enableReinitialize: true,
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const u = JSON.parse(users);
      if (params) {
        console.log(values);
        updateUserByUsername(u, params, values);

        router.push("/");
      } else {
        if (userChecked(values, u) === true) {
          u.push(values);
          localStorage.setItem("users", JSON.stringify(u));
          if (values.isAdmin) {
            localStorage.setItem("currUser", JSON.stringify(values));
          }
          resetForm();
          router.push("/");
        } else {
          alert(userChecked(values, u));
        }
      }
    },
  });

  const userChecked = (newUser: any, users: any) => {
    const emailExists = users.some((user: any) => user.email === newUser.email);
    if (emailExists) {
      console.log("Email already exists");
      return "Email already exists";
    }

    const usernameExists = users.some(
      (user: any) => user.username === newUser.username
    );
    if (usernameExists) {
      console.log("Username already exists");
      return "Username already exists";
    }
    return true;
  };

  const updateUserByUsername = (users: any, username: any, updates: any) => {
    for (let user of users) {
      if (user.username === username) {
        for (let key in updates) {
          if (user.hasOwnProperty(key)) {
            user[key] = updates[key];
          }
        }
        localStorage.removeItem("users");
        localStorage.setItem("users", JSON.stringify(users));
        return user;
      }
    }
    return null;
  };

  return (
    <form
      className="max-w-md mx-auto border border-gray-900 p-8 rounded-lg bg-white"
      style={{ boxShadow: "5px 5px 50px" }}
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-3xl font-bold text-center my-3">Registration Form</h1>
      <label className="inline-flex items-center mb-5 cursor-pointer">
        <input
          type="checkbox"
          checked={formik.values.isAdmin}
          className="sr-only peer"
          {...formik.getFieldProps("isAdmin")}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all  peer-checked:bg-blue-600" />
        <span className="ms-3 text-sm font-medium text-gray-900 ">
          Administrator
        </span>
      </label>

      <div className="relative z-0 w-full mb-5 group">
        <label>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none ${
            formik.errors.username
              ? "border-red-500"
              : "focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          }`}
          placeholder="Please enter username"
          // autoComplete="off"
          {...formik.getFieldProps("username")}
          // setValues()
        />
        {formik.errors.username && formik.touched.username && (
          <div className="text-red-500 text-sm">{formik.errors.username}</div>
        )}
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label>First name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none ${
              formik.errors.first_name
                ? "border-red-500"
                : "focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            }`}
            placeholder="Please enter first name"
            autoComplete="off"
            {...formik.getFieldProps("first_name")}
          />
          {formik.errors.first_name && formik.touched.first_name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.first_name}
            </div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label>Last name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none ${
              formik.errors.last_name
                ? "border-red-500"
                : "focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            }`}
            placeholder="Please enter last name"
            autoComplete="off"
            {...formik.getFieldProps("last_name")}
          />
          {formik.errors.last_name && formik.touched.last_name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.last_name}
            </div>
          )}
        </div>
      </div>

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

      <div className="relative z-0 w-full mb-5 group">
        <label>Confirm password</label>
        <input
          type="password"
          id="repeat_password"
          name="repeat_password"
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none ${
            formik.errors.repeat_password
              ? "border-red-500"
              : "focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          }`}
          placeholder="Confirm password "
          autoComplete="new-password"
          {...formik.getFieldProps("repeat_password")}
        />
        {formik.errors.repeat_password && formik.touched.repeat_password && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.repeat_password}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-1 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label>Phone number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none ${
              formik.errors.phone
                ? "border-red-500"
                : "focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            }`}
            placeholder="Please enter your phone number"
            autoComplete="off"
            {...formik.getFieldProps("phone")}
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.phone}
            </div>
          )}
        </div>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label>Address</label>
        <input
          type="text"
          id="address"
          name="address"
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none ${
            formik.errors.address
              ? "border-red-500"
              : "focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          }`}
          placeholder="Please enter address"
          autoComplete="off"
          {...formik.getFieldProps("address")}
        />
        {formik.errors.address && formik.touched.address && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.address}
          </div>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label>About</label>
        <input
          type="text"
          id="about"
          name="about"
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none ${
            formik.errors.about
              ? "border-red-500"
              : "focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          }`}
          placeholder="Please enter about you"
          autoComplete="off"
          {...formik.getFieldProps("about")}
        />

        {formik.errors.about && formik.touched.about && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.about}</div>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {params ? "Update" : "Register"}
      </button>
      <Link href="/login" className="text-blue-900">
        Already have a account?
      </Link>
    </form>
  );
};

export default Registration;
