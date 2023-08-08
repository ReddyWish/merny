import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, updatePost } from "./postsSlice.js";
import { BASE_URL } from "../../api/axios.js";

const EditPost = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const posts = useSelector(selectAllPosts)
  const post  = posts.find(post => post._id === id)
  const user = post?.user
  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)
  const [image, setImage] = useState(post?.imgUrl || "")
  console.log(image)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const canSave = [title, content].every(Boolean);

  const onImageChanged = e => setImage(e.target.files[0])


  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("id", id);
        formData.append("content", content);
        formData.append("user", user);
        formData.append("image", image);
        await dispatch(updatePost(formData)).unwrap();
        setTitle("");
        setContent("");
        navigate('/dash/posts');
      } catch (err) {
        console.error(err)
      }
    }
  }

  const onCancelClicked = async () => {
    navigate('/dash/posts')
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Edit Post 🖎</h2>
      <form>

        <div className="flex flex-grow justify-center mt-6 mb-8">
          {!image ? (<div className="max-w-2xl rounded-lg shadow-xl bg-gray-50 w-full">
            <div className="m-4">
              <div className="flex items-center justify-center w-full">
                <label
                  className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-9">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Attach a image</p>
                  </div>
                  <input type="file" className="opacity-0" onChange={onImageChanged}/>
                </label>
              </div>
            </div>
          </div>) : ( <div className="relative w-full max-w-2xl rounded-lg shadow-xl bg-gray-50">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
              onClick={() => setImage("")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {
              image instanceof Blob ? <img  src={URL.createObjectURL(image)} alt=""/> : <img src={`${BASE_URL}/uploads/${post.imgUrl}`} alt=""/>
            }
          </div>)}
        </div>

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
            onClick={onCancelClicked}
            className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditPost;

