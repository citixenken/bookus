import * as Sentry from "@sentry/react";
import Landing from "./screens/Landing";
import "./input.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./screens/loggedIn/Home";
import ForgotPassword from "./components/ForgotPassword";
import NewBookForm from "./screens/NewBookForm";

import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Landing />} />
      <Route path="/register" element={user ? <Home /> : <Register />} />
      <Route
        path="/forgotpassword"
        element={user ? <Home /> : <ForgotPassword />}
      />
      <Route path="/home" element={user ? <Home /> : <Landing />} />
      <Route path="/add" element={user ? <NewBookForm /> : <Landing />} />
    </Routes>
  );
}

export default Sentry.withProfiler(App);
