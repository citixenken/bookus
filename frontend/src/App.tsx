import { useEffect, useState } from "react";
import * as Sentry from "@sentry/react";
import Landing from "./screens/Landing";
import "./input.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./screens/loggedIn/Home";
import { AuthContextProvider } from "../context/AuthContext";
import { BookContextProvider } from "../context/BookContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./screens/ForgotPassword";
import NewBookForm from "./screens/NewBookForm";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default Sentry.withProfiler(App);
