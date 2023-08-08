import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment } from "./commentsSlice.js";
import { useParams } from "react-router-dom";
import { selectComments } from "./commentsSlice.js";
import jwt_decode from "jwt-decode";

const AddCommentForm = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [comment, setComment] = useState("")
  const comments = useSelector(selectComments)

  const accessToken = window.localStorage.getItem("token");
  const decoded = accessToken ? jwt_decode(accessToken) : undefined;
  const user = decoded?.UserInfo?.id || ""

  const onCommentChanged = e => setComment(e.target.value);

  const onSaveCommentClicked = async () => {
    if (comment) {
      try {
        await dispatch(addNewComment({comment, id, user})); // Pass formData to the action
        setComment("");
      } catch (err) {
        console.error("failed to save the comment")
      }
    }
  }

  return (
    <section className="not-format">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments.length})</h2>
      </div>
      <form className="mb-6">
        <div
          className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="comment" className="sr-only">Your comment</label>
          <textarea id="comment" rows="6"
                    value={comment}
                    onChange={onCommentChanged}
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..." required></textarea>
        </div>
        <button type="button" onClick={onSaveCommentClicked} disabled={!comment}
                className={`${
                  comment ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                } text-white text-sm font-medium rounded-lg px-4 py-2.5`}>
          Post comment
        </button>
      </form>
    </section>
);
}

export default AddCommentForm;