import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchPosts } from "./postsSlice.js";
import { useParams } from "react-router-dom";
import { deletePost, getPostsStatus, selectPostById } from "./postsSlice.js";
import { selectComments } from "../comments/commentsSlice.js";
import { getPostComments } from "../comments/commentsSlice.js";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {  selectUserById } from "../users/usersSlice.js";
import AddCommentForm from "../comments/AddCommentForm.jsx";
import CommentsList from "../comments/CommentsList.jsx";
import useOutsideClick from "../../hooks/useOutsideClick.js";
import EditRemoveReportPost from "../../components/dropdown/EditRemoveReportPost.jsx";
import { toast } from "react-toastify";
import { BASE_URL } from "../../api/axios.js";

const Post = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate()
  const post = useSelector((state) => selectPostById(state, id))
  const user = useSelector((state) => selectUserById(state, post?.user))
  const comments = useSelector(selectComments)
  const formattedDate = post && format(new Date(post?.createdAt), 'MMMM dd, yyyy');
  const postStatus = useSelector(getPostsStatus);
  const ref = useRef()
  useOutsideClick(ref, () => setIsDropdownOpen(false))
  const notify = () => toast.warn("This post has been reported");

  const onDeletePostClicked = async () => {
    try {
      await dispatch(deletePost(id)).unwrap()
      navigate('/dash/posts')
    } catch (err) {
      console.error(err)
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  useEffect(() => {
    dispatch(getPostComments(id))
    if (!post || !comments) {
      dispatch(fetchPosts());
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  const handleEdit = () => navigate(`/dash/posts/edit/${post?._id}`);

  let content

  if (postStatus === "loading") {
    content = <p>loading...</p>
  } else if (postStatus === "succeeded") {
    content = (
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl flex-col gap-10">
          <article
            className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img className="mr-4 w-16 h-16 rounded-full mx-auto object-cover"
                       src={`${BASE_URL}/uploads/avatars/${user?.avatar}`} alt="avatar"/>
                    <div>
                      <Link to={`/dash/users/${user?._id}/profile`} rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{user?.username}</Link>
                      <p className="text-base font-light text-gray-500 dark:text-gray-400">{user?.profession}</p>
                      <p className="text-base font-light text-gray-500 dark:text-gray-400">
                        {post && <time dateTime={formattedDate} title="February 8th, 2022">{formattedDate}</time>}
                      </p>
                    </div>
                </div>
              </address>
              <div className="flex justify-start gap-5">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{post?.title} </h1>

              <div className="relative">
                <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1" onClick={toggleDropdown}
                                          ref={ref}
                                          className="inline-flex items-center mt-1.5 p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                          type="button">
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                    </path>
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>
                {isDropdownOpen && <EditRemoveReportPost onEditClick={handleEdit} onReportClick={notify} onRemoveClick={onDeletePostClicked} postAuthorId={post.user}/>}
              </div>
              </div>
            </header>
            <figure className="max-w-md mx-auto">
              {post?.imgUrl && <img className="max-w-full h-auto mb-8" src={`${BASE_URL}/uploads/${post?.imgUrl}`} alt="image"/>}
            </figure>
            <p>{post?.content}</p>
            </article>
          {post && (
            <>
            <AddCommentForm/>
            <CommentsList/>
            </>)}
          </div>
        </main>
    )
  } else if (postStatus === "failed") {
    content = <p>error</p>
  }
  return content;
}

export default Post;
