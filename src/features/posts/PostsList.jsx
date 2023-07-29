import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice.js";
import PostExcerpt from "./PostExcerpt.jsx";
import PublicPosts from "../../components/public/PublicPosts.jsx";
import Pagination from "../../components/Pagination.jsx";
import { fetchUsers } from "../users/usersSlice.js";

const PostsList = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => post.title.toLowerCase().includes(title.toLowerCase())).sort((a, b) => b.createdAt.localeCompare(a.createdAt));;
  }, [posts, title]);

  const postsPerPage = 4;
  const [visiblePosts, setVisiblePosts] = useState(filteredPosts.slice(0, postsPerPage));

  const loadMorePosts = () => {
    const nextIndex = visiblePosts.length + postsPerPage;
    setVisiblePosts(filteredPosts.slice(0, nextIndex));
  };

  const handleSearch = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
    dispatch(fetchUsers());
  }, [dispatch, posts]);

  useEffect(() => {
    setVisiblePosts(filteredPosts.slice(0, postsPerPage));
  }, [filteredPosts]);

  let content;

  if (postStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postStatus === "succeeded") {
    const tableContent = visiblePosts.map((post) => <PostExcerpt key={post._id} post={post} />);
    content = (
      <div>
        <form className="pb-7">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={title}
              onChange={handleSearch}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search the posts by the Title"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PublicPosts />
          {tableContent}
        </div>
        {visiblePosts.length < filteredPosts.length && <Pagination onClick={loadMorePosts} />}
      </div>
    );
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <>
      {posts.length ? content : <h1 className="text-center">No Posts yet 👀 <p>feel free to create New Post ✍🏻</p></h1>}
    </>
  );
};

export default PostsList;
