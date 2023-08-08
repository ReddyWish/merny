import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "../../features/posts/postsSlice.js";
import useCurrentUser from "../../hooks/useCurrentUser.js";

function EditRemoveReportComment({ onEditClick, onRemoveClick, onReportClick, commentAuthor }) {

  const { id } = useParams()
  const post = useSelector((state) => selectPostById(state, id))
  const currentUser = useCurrentUser();
  const currentUserId = currentUser.id
  const admin = currentUser.admin
  const editor = currentUser.editor
  const authorOfTheComment = currentUserId === commentAuthor?._id
  const authorOfThePost = currentUserId === post.user

  return (
    <div id="dropdownComment1"
         className="absolute right-10 mt-2 w-36 bg-white rounded divide-x divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconHorizontalButton">
        {(admin || editor || authorOfTheComment) && (

            <li>
              <button onClick={onEditClick}
                      className="block w-full bg-transparent border-none text-gray-400 text-sm hover:text-gray-600 focus:outline-none">Edit
              </button>
            </li> )}
        {(admin || editor || authorOfTheComment || authorOfThePost) && (
            <li>
              <button onClick={onRemoveClick}
                      className="block w-full bg-transparent border-none text-gray-400 text-sm hover:text-gray-600 focus:outline-none">Delete
              </button>
            </li>)}
        {!authorOfTheComment && <li>
          <button onClick={onReportClick}
                  className="block w-full bg-transparent border-none text-gray-400 text-sm hover:text-gray-600 focus:outline-none">Report
          </button>
        </li>}
      </ul>
    </div>
  );
}

export default EditRemoveReportComment;