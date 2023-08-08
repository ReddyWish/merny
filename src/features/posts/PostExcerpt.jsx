import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserById } from "../users/usersSlice.js";
import PostExcerptWithoutTheImage from "./PostExcerptWithoutTheImage.jsx";
import { BASE_URL } from "../../api/axios.js";

const PostExcerpt = ({ post }) => {
  const user = useSelector(state => selectUserById(state, post.user))
  const navigate = useNavigate();
  const formattedDate = format(new Date(post.createdAt), 'MMMM dd, yyyy');

  if (post) {
    const handleRead = () => navigate(`/dash/posts/${post._id}`);

    return (
      <div>
        {post.imgUrl ? (
          <div className="max-w-xl mb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/dash/posts/${post._id}`}><img
              className="rounded-t-lg w-full h-40 object-cover"
              src={`${BASE_URL}/uploads/${post.imgUrl}`}
              alt="image"
            /></Link>
            <div className="pl-6 pb-6 pr-6">
              <h5
                className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white transform skewX-6 line-clamp-1">
                {post.title}
              </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm line-clamp-1">{post.content}</p>
            <p className="mb-2 text-gray-600 dark:text-gray-300 text-xs">Published on: {formattedDate}</p>
              { user.username ? <Link to={`/dash/users/${user?._id}/profile`}
                     ><p className="mb-2 dark:text-gray-300 text-xs text-gray-700">By: {user?.username}</p></Link>
              :
                <p className="mb-2 text-gray-600 dark:text-gray-300 text-xs">By: deleted User</p>
              }
            <button
              onClick={handleRead}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button>
            </div>
          </div>) : (<PostExcerptWithoutTheImage post={post} handleRead={handleRead}/>)}
      </div>)
  } else return null
}

export default PostExcerpt;