import { useAuthContext } from "./useAuthContext";
import { useBookContext } from "./useBookContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  // const { dispatch } = useBookContext(); // error: 'dispatch has already been declared'
  const { dispatch: bookDispatch } = useBookContext();

  const logout = async () => {
    // update global state and delete token from local storage
    dispatch({ type: "LOGOUT_USER" });
    localStorage.removeItem("user_data");
    // clear global book state from application on logout. Avoids flashing of prev user data on render
    bookDispatch({ type: "SET_BOOKS", payload: null });
  };

  return { logout };
};

export default useLogout;
