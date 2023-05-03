import React, { useState, useEffect } from "react";
import { FaMusic, FaChevronLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../src/components/Navbar/Navbar";

const UserInfo = () => {
  const { id } = useParams();

  const USERS_ENDPOINT = "https://jsonplaceholder.typicode.com/users";
  const ALBUMS_ENDPOINT = "https://jsonplaceholder.typicode.com/albums";

  const [user, setUser] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchUserAlbums();
  }, []);

  // READ - GET /users
  const fetchUser = async () => {
    await fetch(`${USERS_ENDPOINT}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  // READ - GET /albums
  const fetchUserAlbums = async () => {
    await fetch(ALBUMS_ENDPOINT)
      .then((res) => res.json())
      .then((data) => setAlbums(data))
      .catch((err) => console.log(err));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-darkBlue">
        <span className="h-12 w-12 block rounded-full border-4 border-t-brightRed animate-spin"></span>
        <div className="text-lg font-bold text-darkBlue">
          Loading Profile...
        </div>{" "}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container bg-veryPaleRed rounded-2xl mx-auto py-12 px-8">
        <div className="text-4xl text-darkBlue mb-8 flex flex-row justify-around gap-6">
          <button onClick={() => navigate("/home")}>
            <FaChevronLeft className="text-4xl" />
          </button>
          <div className="flex flex-row space-x-4 justify-center items-center">
            <FaMusic className="text-4xl" />
            <span>{user.name}'s Album Collection</span>
          </div>
        </div>

        <ol className=" grid lg:grid-cols-1 gap-6">
          {albums
            .filter((album) => album.userId === user.id)
            .map((album, idx) => {
              return (
                <button
                  key={idx}
                  className="hover:scale-105 duration-300"
                  onClick={() => navigate(`/albums/${album.id}`)}
                >
                  <li className="bg-brightRedLight text-darkBlue text-xl shadow-lg rounded-lg overflow-hidden p-4 text-center ">
                    {idx + 1}.{" "}
                    {album.title[0].toUpperCase() + album.title.slice(1)}
                  </li>
                </button>
              );
            })}
        </ol>
      </div>
    </>
  );
};

export default UserInfo;
