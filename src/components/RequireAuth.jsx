import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode"

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  // const accessToken = useSelector(selectAccessToken);
  const accessToken = window.localStorage.getItem("token");
  const decoded = accessToken ? jwt_decode(accessToken) : undefined;

  const roles = decoded?.UserInfo?.roles || []

  return (
    roles.find(role => allowedRoles?.includes(role))
      ? <Outlet/>
      : accessToken
        ? <Navigate to="/unauthorized" state={{ from: location }} replace/>
        : <Navigate to="/login" state={{ from: location }} replace/>
  )
}

export default RequireAuth