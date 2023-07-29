import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserPosts, selectUserById } from "./usersSlice.js";
import { useSelector } from "react-redux";
import { selectUsersPosts } from "./usersSlice.js";
import { Link } from "react-router-dom";
import { deletePost } from "../posts/postsSlice.js";
import { deletePostOfTheUser } from "./usersSlice.js";
import jwt_decode from "jwt-decode";

function UsersPosts() {
  const dispatch = useDispatch()
  const accessToken = window.localStorage.getItem("token");
  const decoded = accessToken ? jwt_decode(accessToken) : undefined;
  const roles = decoded?.UserInfo?.roles || []
  const { id } = useParams();
  const usersPosts = useSelector(selectUsersPosts)
  const user = useSelector((state) => selectUserById(state, id))
  const eligibleToDelete = roles.includes(5150) || roles.includes(1984)

  useEffect(() => {
    dispatch(getUserPosts(id))
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePost(id)).unwrap()
      dispatch(deletePostOfTheUser(id))
    } catch (err) {
      console.error(err)
    }
  }

  let content

  if (usersPosts.length === 0) {
    content = (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {`User ${user.username} has no posts yet 🫤`}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Don't worry, {user.username} will share some exciting posts soon!
        </p>
      </div>
    )
  } else {
    content = (
      <div className="flex justify-center items-center">
        <div className="max-w-screen-lg w-full mx-auto overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Posts of {user?.username}
              </th>
              {eligibleToDelete && <th scope="col" className="px-6 py-3">
                actions
              </th>}
            </tr>
            </thead>
            <tbody>
            {usersPosts.map(userPost => (
              <tr key={userPost._id} className="bg-white dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                  <Link to={`/dash/posts/${userPost._id}`}>{userPost.title}</Link>
                </td>
                {eligibleToDelete && <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(userPost._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return content;
}

export default UsersPosts;