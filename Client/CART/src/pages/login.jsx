import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { api } from "../axios"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createUser } from "../Redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: async (values) => {
      try {
        const { data } = await api.get("users/login", {params: values}); 
        console.log(data.token);
        // db connection =>
        localStorage.setItem("access_token", data.token);  
        toast.success("Login successful!");
        dispatch(createUser(data.user));
        navigate("/home");
      } catch (error) {
        console.error(error);
        toast.error("Login failed. Please try again.");
      }
    }
  });

  return (
    <div className="d-flex justify-content-center mt-4">
      <form onSubmit={formik.handleSubmit} className="w-50 d-flex flex-column gap-2">
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button className="btn btn-success w-100" type="submit">
          LOGIN
        </button>
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

