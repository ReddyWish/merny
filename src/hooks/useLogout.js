import { useDispatch } from "react-redux";
import { clearRefreshToken } from "../features/auth/authSlice";

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await dispatch(clearRefreshToken())
      window.localStorage.removeItem("token");
      console.log("refresh token cleared successfully")
    } catch (err) {
      console.error(err)
    }
  }
  return logout
}

export default useLogout