import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "./postsSlice.js";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const NewPost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = window.localStorage.getItem("token");

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  // const [user, setUser] = useState("")
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const decoded = accessToken ? jwt_decode(accessToken) : undefined;

  const user = decoded?.UserInfo?.id || ""

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const canSave = [title, content].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(addNewPost({ title, content, user })).unwrap()
        setTitle("")
        setContent("")
        navigate('/dash/posts')
      } catch (err) {
        console.error("failed to save the post")
      } finally {
        setAddRequestStatus("idle")
      }
    }
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Add a New Post 🖎</h2>
      <form>
        <div className="mb-6">
          <label htmlFor="postTitle"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input type="text"
                 id="postTitle"
                 name="postTitle"
                 value={title}
                 onChange={onTitleChanged}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 required/>
        </div>
        <div className="mb-6">
          <label htmlFor="postContent"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
          <textarea id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required></textarea>
        </div>
        <button type="button"
                onClick={onSavePostClicked}
                disabled={!canSave}
                className={`${
                  canSave ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                } text-white text-sm font-medium rounded-lg px-4 py-2.5`}>Publish
        </button>
      </form>
    </section>
  );
}

export default NewPost;