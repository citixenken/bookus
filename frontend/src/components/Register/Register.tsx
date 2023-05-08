import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <h1 className="font-bold text-4xl text-red-500">Register</h1>
      <form
        action=""
        className="flex flex-col px-8 gap-4"
        onSubmit={handleSubmit}
      >
        <input
          className="p-2 mt-4 rounded-md border"
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <input
            className="p-2 mt-1 rounded-md border w-full"
            type="password"
            name="password"
            placeholder="Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="gray"
            class="bi bi-eye absolute top-1/2 right-2 -translate-y-1/2"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
        </div>
        <button className="bg-red-500 rounded-md text-white py-2 hover:scale-105 duration-300">
          Register
        </button>
      </form>

      <div className="text-md flex justify-around items-center py-4">
        <p>Already have an account?</p>
        {/* <button className="py-2 px-4 bg-red-500 rounded-md text-white hover:scale-105 duration-300">
          Sign In
        </button> */}
        <Link to="/" className="text-red-500">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
