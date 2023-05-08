import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    // update global state and delete token from local storage
    dispatch({ type: "LOGOUT_USER" });
    localStorage.removeItem("user_data");
  };

  return { logout };
};

export default useLogout;
