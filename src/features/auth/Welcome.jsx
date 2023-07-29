import { useEffect } from 'react';
import PublicPosts from "../../components/public/PublicPosts";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../posts/postsSlice.js";
import { fetchUsers } from "../users/usersSlice.js";
import Pagination from "../../components/Pagination.jsx";

const Welcome = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getUsers = async () => {
      try {
        await dispatch(fetchUsers());
        await dispatch(fetchPosts());
      } catch (err) {
        if (err.name !== 'CanceledError') {
          console.error(err);
        }
      }
    }
    getUsers()
  }, [dispatch])

  const content = (
    <section>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <PublicPosts/>
    </div>
      <Pagination/>
    </section>
  )
  return content;
}

export default Welcome;