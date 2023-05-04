import { useEffect, useState } from "react";
import * as Sentry from "@sentry/react";
import Landing from "./screens/Landing";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./screens/loggedIn/Home";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./screens/ForgotPassword";

function App() {
  // const USERS_ENDPOINT = "https://jsonplaceholder.typicode.com/users";
  // const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // // READ

  // const fetchUsers = async () => {
  //   try {
  //     const response = await fetch(USERS_ENDPOINT);
  //     const data = await response.json();
  //     setUsers(data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // // CREATE => POST
  // const addUser = async (newUser) => {
  //   await fetch(USERS_ENDPOINT, {
  //     method: "POST",
  //     body: JSON.stringify(newUser),
  //     headers: { "Content-Type": "application/json; charset=UTF-8" },
  //   })
  //     .then((res) => {
  //       //res 201 - Created OK
  //       if (res.status !== 201) {
  //         return;
  //       } else {
  //         return res.json();
  //       }
  //     })
  //     .then((data) => {
  //       setUsers((users) => [data, ...users]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // // DELETE
  // const deleteUser = async (id) => {
  //   await fetch(`${USERS_ENDPOINT}/${id}`, { method: "DELETE" })
  //     .then((res) => {
  //       if (res.status !== 200) {
  //         return;
  //       } else {
  //         setUsers(
  //           users.filter((user) => {
  //             return user.id !== id;
  //           })
  //         );
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const user = users.map((user) => (
  //   <User
  //     id={user.id}
  //     key={user.id}
  //     name={user.name}
  //     email={user.email}
  //     onDelete={deleteUser}
  //   />
  // ));

  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default Sentry.withProfiler(App);
