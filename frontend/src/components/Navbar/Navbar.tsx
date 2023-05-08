import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { logout } = useLogout();

  const handleAddBook = () => {
    navigate("/add");
  };

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
      <nav className="relative container mx-auto p-6 mb-6 bg-gray-200 rounded-xl">
        {/* flex container */}
        <div className="flex items-center justify-around">
          {/* navbar items */}
          <div className=" md:flex space-x-12">
            <a
              href="/home"
              className="hover:text-darkGrayishBlue text-2xl hover:scale-125"
            >
              <div className="flex flex-row space-x-2 items-center">
                <GiBookshelf className="text-4xl" />
                <span>Bookus</span>
              </div>
            </a>
          </div>
          {/* add new book  */}
          <button
            href="/add"
            className="sm:block p-3 px-6 pt-2 text-black bg-emerald-500 rounded-full baseline hover:bg-red-500Light"
            onClick={handleAddBook}
          >
            Add New Book
          </button>

          {/* logged in user email */}
          {user && (
            <div>
              <span>{user.email}</span>
            </div>
          )}

          {/* logout button */}
          <button
            href="/"
            className="sm:block p-3 px-6 pt-2 text-black bg-red-500 rounded-full baseline hover:bg-red-500Light"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
