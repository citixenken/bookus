import React, { useState } from "react";

const AddUser = ({ addUser }) => {
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser({ ...newUser, [name]: value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    addUser(newUser);
    // reset form after submission
    setNewUser({ name: "", email: "" });
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <h3>Add User</h3>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newUser.name}
          onChange={handleFormChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={handleFormChange}
        />
        <button type="submit" value="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddUser;
