import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, updatePost } from "./postsSlice.js";
import { deletePost } from "./postsSlice.js";

const EditPost = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const posts = useSelector(selectAllPosts)
  const post  = posts.find(post => post._id === id)
  const user = post?.user
  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const canSave = [title, content].every(Boolean)

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await dispatch(updatePost({ title, content, id, user })).unwrap()
        setTitle('')
        setContent('')
        navigate('/dash/posts')
      } catch (err) {
        console.error(err)
      }
    }
  }

  const onDeletePostClicked = async () => {
    try {
      await dispatch(deletePost(id)).unwrap()
      navigate('/dash/posts')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Edit Post 🖎</h2>
      <form>
        <div className="mb-6">
          <label htmlFor="postTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
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
        <div className="flex justify-start mt-4">
          <button
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
            className={`${
              canSave ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            } mr-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            Save
          </button>
          <button
            type="button"
            onClick={onDeletePostClicked}
            className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Delete
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditPost;

