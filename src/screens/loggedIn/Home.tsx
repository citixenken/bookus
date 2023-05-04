import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { UserAuth } from "../../../context/AuthContext";

const Home = () => {
  const { user } = UserAuth();

  return (
    <>
      <Navbar />
      <h4 className="text-2xl text-darkBlue font-normal">
        Welcome back, {user ? user.email : null}!
      </h4>
      <p className="text-4xl mt-4 py-4 text-darkGrayishBlue">
        Books Currently Available{" "}
      </p>
    </>
  );
};

export default Home;
