import { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllUsers, fetchUsers, getError, getStatus } from "../features/users/usersSlice";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUsers = async () => {
      try {
        await dispatch(fetchUsers());
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();
  }, [dispatch, navigate, location]);

  return (
    <article>
      <h2>Users List</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && users.length > 0 ? (
        <ul>
          {users.map((user, i) => <li key={i}>{user.username}</li>)}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}

export default Users;