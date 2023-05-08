import { useEffect, useState } from "react";
import * as Sentry from "@sentry/react";
import { AuthContextProvider } from "./context/AuthContext";
import { BookContextProvider } from "./context/BookContext";
import Landing from "./screens/Landing";
import "./input.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./screens/loggedIn/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./screens/ForgotPassword";
import NewBookForm from "./screens/NewBookForm";

function App() {
  return (
    <AuthContextProvider>
      <BookContextProvider>
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
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <NewBookForm />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BookContextProvider>
    </AuthContextProvider>
  );
}

export default Sentry.withProfiler(App);
