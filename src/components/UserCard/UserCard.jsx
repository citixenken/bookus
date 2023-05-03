import React, { useState, useEffect } from "react";
import { FaUserNinja } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserCard = () => {
  const USERS_ENDPOINT = "https://jsonplaceholder.typicode.com/users";
  const ALBUMS_ENDPOINT = "https://jsonplaceholder.typicode.com/albums";

  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchUserAlbums();
  }, []);

  // READ - GET /users
  const fetchUsers = async () => {
    try {
      const response = await fetch(USERS_ENDPOINT);
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // READ - GET /albums
  const fetchUserAlbums = async () => {
    try {
      const response = await fetch(ALBUMS_ENDPOINT);
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-darkBlue">
        <span className="h-12 w-12 block rounded-full border-4 border-t-brightRed animate-spin"></span>
        <div className="text-lg font-bold text-darkBlue">
          Loading users... Be patient
        </div>
      </div>
    );
  }

  return (
    <div className="container bg-veryPaleRed rounded-2xl mx-auto py-12 px-8">
      <div className="grid lg:grid-cols-2 gap-6">
        {users.map((user, id = user.id) => (
          <div
            className="bg-veryLightGray shadow-lg rounded-lg overflow-hidden"
            key={id}
          >
            <div className="px-6 py-4">
              <div className="flex items-center justify-center mb-2">
                <FaUserNinja className="w-24 h-24 mr-4" />
              </div>
              <div className="text-center text-2xl text-brightRed mb-3">
                {user.name}
              </div>
              <div className="flex flex-row justify-content space-x-1 items-center">
                <label>Handle:</label>
                <div className="text-center text-md font-medium">
                  @{user.username.toLowerCase()}
                </div>
              </div>
              <div className="flex flex-row justify-content space-x-1 items-center">
                <label>Email:</label>
                <div className="text-center text-md text-darkBlue">
                  {user.email.toLowerCase()}
                </div>
              </div>
              <div className="flex flex-row justify-content space-x-1 items-center">
                <label>Company Name:</label>
                <div className="text-center text-md text-darkBlue">
                  {user.company.name}
                </div>
              </div>
              <div className="flex flex-row justify-content space-x-1 items-center mb-4">
                <label>Company Slogan:</label>
                <div className="text-center text-md text-darkBlue italic">
                  {user.company.bs[0].toUpperCase() + user.company.bs.slice(1)}
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <button
                  //   href="/userinfo"
                  //   className="hidden md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
                  className="inline-block px-6 py-2.5 bg-brightRed rounded-xl text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-brightRedLight focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  {user.name}'s Profile
                </button>
              </div>
              <hr />

              <div className=" text-md mt-4 flex flex-row justify-center">
                <label> Number of Albums:</label>
                {
                  <div className="text-brightRed px-1">
                    {albums.filter((album) => album.userId === user.id).length}
                  </div>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
