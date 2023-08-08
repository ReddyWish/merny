import useCurrentUser from "../../hooks/useCurrentUser.js";

function EditRemoveReportPost({ onEditClick, onRemoveClick, onReportClick, postAuthorId }) {

  const currentUser = useCurrentUser()
  const currentUserId = currentUser.id
  const admin = currentUser.admin
  const editor = currentUser.editor
  const authorOfThePost = currentUserId === postAuthorId

  return (
    <div id="dropdownComment1"
         className="absolute right-10 mt-2 w-36 bg-white rounded divide-x divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconHorizontalButton">
        {(admin || editor || authorOfThePost) && (
          <>
            <li>
              <button onClick={onEditClick}
                      className="block w-full bg-transparent border-none text-gray-400 text-sm hover:text-gray-600 focus:outline-none">Edit
              </button>
            </li>
            <li>
              <button onClick={onRemoveClick}
                      className="block w-full bg-transparent border-none text-gray-400 text-sm hover:text-gray-600 focus:outline-none">Delete
              </button>
            </li>
          </>)
        }
        {!authorOfThePost && <li>
          <button onClick={onReportClick}
                  className="block w-full bg-transparent border-none text-gray-400 text-sm hover:text-gray-600 focus:outline-none">Report
          </button>
        </li>}
      </ul>
    </div>
  );
}

export default EditRemoveReportPost;