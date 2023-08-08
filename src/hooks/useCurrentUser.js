import { useMemo } from "react";
import jwt_decode from "jwt-decode";

const useCurrentUser = () => {
  const token = window.localStorage.getItem("token");
  const decoded = token ? jwt_decode(token) : undefined;

  const name = decoded?.UserInfo?.username || "";
  const id = decoded?.UserInfo?.id || "";
  const roles = decoded?.UserInfo?.roles || [];
  const editor = roles.includes(1984);
  const admin = roles.includes(5150);
  const user = roles.includes(2001);

  const currentUser = useMemo(
    () => ({
      name,
      roles,
      token,
      editor,
      user,
      id,
      admin,
    }),
    [name, roles, editor, admin, token, user, id]
  );

  return currentUser;
};

export default useCurrentUser;