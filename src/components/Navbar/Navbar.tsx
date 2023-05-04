import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHouseDamage } from "react-icons/fa";

import { UserAuth } from "../../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { logout } = UserAuth();

  const [open, setOpen] = useState(false);

  function toggleHamburgerButtonClick() {
    setOpen(!open);

    const nav = document.getElementById("menu");
    nav.classList.toggle("flex");
    nav.classList.toggle("hidden");
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {/* navbar */}
      <nav className="relative container mx-auto p-6 mb-6 bg-brightRedSupLight rounded-xl">
        {/* flex container */}
        <div className="flex items-center justify-around">
          {/* navbar items */}
          <div className=" md:flex space-x-12">
            <a
              href="/home"
              className="hover:text-darkGrayishBlue text-2xl hover:scale-125"
            >
              <div className="flex flex-row space-x-2 items-center">
                <FaHouseDamage className="text-4xl" />
                <span>Home</span>
              </div>
            </a>
          </div>
          {/* take a tour button */}
          <button
            href="#"
            className="sm:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
            onClick={handleLogout}
          >
            Logout
          </button>

          {/* hamburger Icon */}
          <button
            id="menu-btn"
            className={
              open
                ? "open block hamburger md:hidden focus:outline-none"
                : "block hamburger md:hidden focus:outline-none"
            }
            onClick={toggleHamburgerButtonClick}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
        {/* mobile menu */}
        <div className="md:hidden">
          <div
            id="menu"
            className="absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center rounded-2xl left-6 right-6 drop-shadow-md"
          >
            <a href="#" className="hover:text-darkGrayishBlue">
              About Us
            </a>
            <a href="#" className="hover:text-darkGrayishBlue">
              Services
            </a>
            <a href="#" className="hover:text-darkGrayishBlue">
              Schedule Appointment
            </a>
            <a href="#" className="hover:text-darkGrayishBlue">
              Location
            </a>
            <a href="#" className="hover:text-darkGrayishBlue">
              Contact Us
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
