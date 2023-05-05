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
