import { useDispatch } from "react-redux";
import { deleteUser } from "./usersSlice.js";
import { Link } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser.js";

const User = ({ user }) => {
  const dispatch = useDispatch()
  const currentUser = useCurrentUser()
  const sessionUserId = currentUser.id;

  const onDeleteClicked = async () => {
    const shouldDelete = window.confirm(`You are going to delete the user ${user.username}, all posts of this author will be deleted too. Do you want to continue?`);
    if (shouldDelete) {
      try {
        await dispatch(deleteUser({ id: user._id })).unwrap();
      } catch (err) {
        console.error("failed to delete the user")
      }
    }
  }

  if (user && user._id !== sessionUserId) { // Add a condition to check the user ID
    const roles = currentUser.roles;
    const isAdmin = roles.find(role => role === 5150);
    const userRolesString = Object.keys(user.roles).toString().replaceAll(",", ", ");

    return (
      <tr className="border-b dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <Link to={`/dash/users/${user?._id}/profile`}>{user.username}</Link>
        </th>
        <td className="px-6 py-4">
          {userRolesString}
        </td>
        <td className="px-6 py-4">
          {isAdmin ? (
            <div>
              <button onClick={onDeleteClicked}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline">delete user
              </button>
              <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2"><Link
                to={`${user._id}`}>view posts of {user.username}</Link></button>
            </div>
          ) : (
            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><Link to={`${user._id}`}>view
              posts of {user.username}</Link></button>
          )}
        </td>
      </tr>
    );
  } else {
    return null;
  }
};

export default User;