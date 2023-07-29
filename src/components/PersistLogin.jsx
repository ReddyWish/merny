import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { requestNewAccessToken } from "../features/auth/authSlice";

const PersistLogin = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = window.localStorage.getItem("token");
  const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    let isMounted = true
    const verifyRefreshToken = async () => {
      try {
        await dispatch(requestNewAccessToken());
      }
      catch (err) {
        console.error(err);
      }
      finally {
        isMounted && setIsLoading(false);
      }
    }

    !accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => isMounted = false;

  }, [])

  return (
    <>
      {!persist
        ? <Outlet />
        : isLoading
          ? <p>Loading</p>
          : <Outlet/>
      }
    </>
  )
}

export default PersistLogin