import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdPhotos } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
import Navbar from "../../src/components/Navbar/Navbar";

const Album = () => {
  const { id } = useParams();

  const ALBUMS_ENDPOINT = "https://jsonplaceholder.typicode.com/albums";
  const PHOTOS_ENDPOINT = " https://jsonplaceholder.typicode.com/photos";

  const [album, setAlbum] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserAlbum();
    fetchPhotos();
  }, []);

  // READ - GET /album
  const fetchUserAlbum = async () => {
    await fetch(`${ALBUMS_ENDPOINT}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAlbum(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  // READ - GET /photos
  // TODO - Service unavailable error message (503)
  const fetchPhotos = async () => {
    await fetch(PHOTOS_ENDPOINT)
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((err) => console.log(err));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-darkBlue">
        <span className="h-12 w-12 block rounded-full border-4 border-t-brightRed animate-spin"></span>
        <div className="text-lg font-bold text-darkBlue">Loading Album...</div>{" "}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container bg-darkGrayishBlue rounded-2xl mx-auto py-12 px-8 my-8">
        <div className="text-4xl text-darkBlue mb-8 flex flex-row gap-6">
          <button onClick={() => navigate(-1)}>
            <FaChevronLeft className="text-4xl" />
          </button>
          <div className="text-4xl font-bold text-darkBlue">
            {/* {album.title[0].toUpperCase() + album.title.slice(1)} */}
            {album.title}
          </div>
        </div>
      </div>
      <div className="container bg-veryPaleRed rounded-2xl mx-auto py-12 px-8">
        <div className="text-4xl font-bold text-darkGrayishBlue mb-4">
          <div className="flex flex-row space-x-4 items-center justify-center mb-8">
            <IoMdPhotos className="text-4xl" />
            <span>Album Photos</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {photos
            .filter((photo) => photo.albumId === album.id)
            .map((photo) => (
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-64 object-cover rounded-lg cursor-pointer"
                key={photo.id}
                onError={(e) => {
                  e.target.src =
                    "https://img.freepik.com/free-vector/503-error-service-unavailable-concept-illustration_114360-1906.jpg?w=826&t=st=1674619488~exp=1674620088~hmac=9773e37ea0924e9cf0ae62553e85a772dafd4c9b8c7ba9eb1c16bd9326c52302";
                }}
                onClick={() => navigate(`/photos/${photo.id}`)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Album;
