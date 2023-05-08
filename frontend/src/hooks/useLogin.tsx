import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
      setSuccess(null);
    }

    if (response.ok) {
      //   save user email + jwtoken to local storage => avoid logging in every time jwt magic
      localStorage.setItem("user_data", JSON.stringify(data));

      //   update the AuthContext
      dispatch({ type: "LOGIN_USER", payload: data });

      setIsLoading(false);
      setSuccess("User logging in...");
    }
  };

  return { login, isLoading, success, error };
};
