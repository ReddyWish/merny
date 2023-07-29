import { useSelector } from "react-redux";
import { getStatus, getError, selectAllUsers } from "./usersSlice.js";
import User from "./User";

function UsersList() {
  const users = useSelector(selectAllUsers);
  const usersStatus = useSelector(getStatus);
  const error = useSelector(getError);

  let content

  if (usersStatus === "loading") {
    content = <p>Loading...</p>
  } else if (usersStatus === "succeeded") {
      const tableContent = users?.length ? users.map(user => <User key={user._id} user={user} />) : null

      content = (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Roles
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
            </thead>
            <tbody>
            {tableContent}
            </tbody>
          </table>
        </div>
      )
  } else if (usersStatus === "failed") {
    console.log(error)
    content = <p>{error}</p>
  }
  return (
    content
  );
}

export default UsersList;