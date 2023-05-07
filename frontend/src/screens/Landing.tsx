import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, signIn, signInGoogle } = UserAuth();

  const navigate = useNavigate();

  // for user signed in with Email/Password combo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  // for user signed in with Google Auth Provider
  const handleSignInWithGoogle = async () => {
    try {
      await signInGoogle();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/home");
    }
  }, [user]);

  return (
    <>
      <section className=" min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-6xl p-5 items-center">
          <div className="md:w-1/2 px-16">
            <h2 className="font-bold text-4xl text-red-500">
              Book<em className="text-darkGrayishBlue">us</em>
            </h2>
            <p className="text-lg mt-4 py-4 text-darkGrayishBlue">
              Explore and discover amazing books in your community
            </p>
            {error && (
              <p className="text-red-500 bg-red-500SupLight rounded-md p-1">
                {error}
              </p>
            )}
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
                  className="bi bi-eye absolute top-1/2 right-2 -translate-y-1/2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>
              <button className="bg-red-500 rounded-md text-white py-2 hover:scale-105 duration-300">
                Login
              </button>
            </form>

            <div className="mt-10 grid grid-cols-3 items-center text-darkGrayishBlue">
              <hr className="border-darkGrayishBlue" />
              <p className="text-center text-md">OR</p>
              <hr className="border-darkGrayishBlue" />
            </div>

            <button
              onClick={handleSignInWithGoogle}
              className="bg-veryPaleRed border py-2 rounded-md w-full mt-5 flex justify-center items-center text-md hover:scale-105 duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-google mr-3"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>
              Continue with Google
            </button>

            <div className="mt-5 text-sm text-red-500 border-b border-darkGrayishBlue py-4 hover:scale-105 duration-300">
              <a href="/forgotpassword">Forgot Password?</a>
            </div>
            <div className="text-md flex justify-around items-center py-4">
              <p>Don't have an account?</p>
              <Link
                to="/register"
                className="text-red-500 hover:scale-105 duration-300"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="w-1/2 md:block hidden">
            <img
              className="rounded-2xl "
              // src="../src/assets/arrow-img.jpg"
              src="https://images.pexels.com/photos/833317/pexels-photo-833317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="test-img"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
