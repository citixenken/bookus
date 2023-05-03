import React from "react";
import "./User.css";

const User = ({
  id,
  name,
  username,
  email,
  company_name,
  company_catchphrase,
  company_bs,
  onDelete,
  userAlbums,
}) => {
  const handleDelete = () => {
    onDelete(id);
  };

  const showAlbums = () => {
    userAlbums(id);
  };

  return (
    <div className="bg-veryLightGray shadow-lg rounded-lg overflow-hidden">
      {/* <img className="h-32 w-32 rounded-full mx-auto" src={} alt={name} /> */}
      <div className="px-6 py-4">
        <div className="text-center text-lg text-brightRed mb-3">{name}</div>
        <div className="text-center text-lg font-medium">
          @alias: {username}
        </div>
        <div className="text-center text-sm text-gray-600">Email: {email}</div>
        <div className="text-center text-sm text-gray-600">
          Company: {company_name}
        </div>
        <div className="text-center text-sm text-gray-600">
          Catchphrase: {company_catchphrase}
        </div>
        <div className="text-center text-sm text-gray-600">
          Motto: {company_bs}
        </div>
      </div>
    </div>
  );
};

export default User;
