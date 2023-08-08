import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { selectUserById } from "../users/usersSlice.js";
import useOutsideClick from "../../hooks/useOutsideClick.js";
import { useDispatch } from "react-redux";
import EditRemoveReportComment from "../../components/dropdown/EditRemoveReportComment.jsx";
import { getCommentsStatus } from "./commentsSlice.js";
import { updateComment, deleteComment } from "./commentsSlice.js";
import CommentSkeleton from "../../components/skeletons/CommentSkeleton.jsx";
import { toast } from "react-toastify";
import { BASE_URL } from "../../api/axios.js";

function Comment({ comment }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openTextArea, setOpenTextArea] = useState(false);
  const [commentText, setCommentText] = useState(comment.comment)
  const user = useSelector((state) => selectUserById(state, comment.author))
  const formattedDate = format(new Date(comment?.createdAt), 'MMMM dd, yyyy');
  const dispatch = useDispatch()
  const ref = useRef()
  useOutsideClick(ref, () => setIsDropdownOpen(false))
  const commentStatus = useSelector(getCommentsStatus)

  const onCommentChanged = e => setCommentText(e.target.value)

  const notify = () => toast.warn("This comment has been reported")

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleTextArea = () => {
    setOpenTextArea(!openTextArea)
  }

  const onEditCommentClicked = async () => {
    if (commentText) {
      try {
        await dispatch(updateComment({ id: comment._id, comment: commentText })).unwrap();
        setOpenTextArea(!openTextArea)
        setIsDropdownOpen(!isDropdownOpen)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const onDeleteCommentClicked = async () => {
    try {
      await dispatch(deleteComment(comment?._id)).unwrap();
      setOpenTextArea(!openTextArea)
      setIsDropdownOpen(!isDropdownOpen)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    (commentStatus === "loading") ? (<CommentSkeleton/>)
      : (<div className="relative max-w-md">
        <article className="mb-5 text-base bg-white rounded-lg dark:bg-gray-900">
          <footer className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                className="mr-2 w-6 h-6 rounded-full mx-auto object-cover"
                src={`${BASE_URL}/uploads/avatars/${user?.avatar}`} alt="Jese Leos"/>
                {user?.username}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time dateTime="2022-02-08"
                      title="February 8th, 2022">{formattedDate}
                </time>
              </p>
            </div>

            <div className="relative">
              {!openTextArea &&
                <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1" onClick={toggleDropdown}
                        ref={ref}
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button">
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                    </path>
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>}

              {isDropdownOpen && !openTextArea && (
                <EditRemoveReportComment onEditClick={toggleTextArea} onRemoveClick={onDeleteCommentClicked}
                                         onReportClick={notify} commentAuthor={user}/>)}
            </div>
          </footer>
          {openTextArea ? (
            <div className="relative w-full">
            <textarea value={commentText} onChange={onCommentChanged}
                      className="resize-none w-full h-16 p-2 border border-gray-300 rounded"
                      placeholder="Enter your text..."
            ></textarea>
              <div className="absolute right-2 bottom-2 space-x-2">
                <button onClick={onEditCommentClicked} className={`${
                  commentText ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                } text-white text-sm font-medium rounded-lg px-3 py-1`}>Submit
                </button>
                <button onClick={toggleTextArea}
                        className="px-3 py-1 bg-gray-300 text-sm font-medium text-gray-700 rounded-lg">Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm">{comment.comment}</p>
          )}
        </article>
        <hr/>
      </div>)
);
}

export default Comment;