import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../api/axios.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, selectUserById } from "./usersSlice.js";
import useCurrentUser from "../../hooks/useCurrentUser.js";
import { useEffect } from "react";

function UserProfile() {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const currentUserId = currentUser.id
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  const user = useSelector((state) => selectUserById(state, id))

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="max-w-3xl">
        <div className="bg-white shadow-xl rounded-lg py-3">
          <div className="photo-wrapper p-4">
            <img className="w-48 h-48 rounded-full mx-auto object-cover" src={`${BASE_URL}/uploads/avatars/${user?.avatar}`} alt="avatar"/> {/* Increase the size of the profile picture */}
          </div>
          <div className="p-4">
            <h3 className="text-center text-2xl text-gray-900 font-medium leading-8">{user.username}</h3>
            <div className="text-center text-gray-500 text-sm font-semibold">
              <p>{user.profession}</p>
            </div>
            <table className="text-sm my-4">
              <tbody>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                <td className="px-2 py-2">{user.email}</td>
              </tr>
              </tbody>
            </table>
            {currentUserId === id && <div className="text-center my-4">
              <Link to={`/dash/users/${id}/profile/edit`}
                    className="text-sm text-indigo-500 hover:underline hover:text-indigo-600 font-medium">Edit
                Profile</Link>
            </div>}
            <div className="text-center my-4">
              <Link to={`/dash/users/${id}`} className="text-sm text-indigo-500 hover:underline hover:text-indigo-600 font-medium">
                {currentUserId === id ? (<p>View My Posts</p>) : <p>View Posts of {user.username}</p>}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;