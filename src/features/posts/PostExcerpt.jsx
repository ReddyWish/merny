import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice.js";


const PostExcerpt = ({ post }) => {
  const user = useSelector(state => selectUserById(state, post.user))
  const navigate = useNavigate();
  const formattedDate = format(new Date(post.createdAt), 'MMMM dd, yyyy');

  if (post) {
    const handleEdit = () => navigate(`/dash/posts/edit/${post._id}`);
    const handleRead = () => navigate(`/dash/posts/${post._id}`);

    return (
      <div
        className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white transform skewX-6 line-clamp-1">{post.title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm line-clamp-1">{post.content}</p>
        <p className="mb-2 text-gray-600 dark:text-gray-300 text-xs">Published on: {formattedDate}</p>
        <p className="mb-2 text-gray-600 dark:text-gray-300 text-xs">By: {user?.username || "deleted author"}</p>
        <button onClick={handleRead}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
          <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>
      </div>
    )
  } else return null
}

export default PostExcerpt;