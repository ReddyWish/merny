import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postsSlice.js";
import { selectAllPosts } from "./postsSlice.js";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

function MyPosts() {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const posts = useSelector(selectAllPosts);
  console.log(posts)

  const decoded = token ? jwt_decode(token) : undefined;

  const id = decoded?.UserInfo?.id || ""

  console.log(id)

  const myPosts = posts.filter(post => post.user === id)

  console.log(myPosts)


  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch]);

  let content

  if (myPosts.length === 0) {
    content = (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          You have no posts yet 🫤
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Don't hesitate to share some exciting posts!
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
                There are your posts
              </th>
              <th scope="col" className="px-6 py-3">
                actions
              </th>
            </tr>
            </thead>
            <tbody>
            {myPosts.map(myPost => (
              <tr key={myPost._id} className="bg-white dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                  <Link to={`/dash/posts/${myPost._id}`}>{myPost.title}</Link>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/dash/posts/edit/${myPost._id}`}
                    className="mr-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit
                  </Link>
                </td>
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

export default MyPosts;