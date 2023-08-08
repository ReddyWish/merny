import { useFormik } from "formik";
import { basicSchema } from "../../components/yup/schemas/index.js";
import { useDispatch } from "react-redux";
import useCurrentUser from "../../hooks/useCurrentUser.js";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice.js";
import { BASE_URL } from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import { updateUser } from "./usersSlice.js";
import useLogout from "../../hooks/useLogout.js";


function UserEditProfile() {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const id = currentUser.id;
  const navigate = useNavigate();
  const logout = useLogout();

  const user = useSelector((state) => selectUserById(state, id))


  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("id", id);
      formData.append("profession", values.profession);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("avatar", values.avatar);
      if (values.password) {
       const confirmed = window.confirm("To finish reset of the password you will be logged out of the system, do you want to continue?")
        if (confirmed) {
          await dispatch(updateUser(formData)).unwrap()
          await logout();
          navigate('/');
        } else {
          return
        }
      } else {
        await dispatch(updateUser(formData)).unwrap()
        navigate(`/dash/users/${id}/profile`);
      }
    } catch (err) {
      console.error(err)
    }
  }

  const { values, errors, touched, handleBlur, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      avatar: "1672146784_new_preview_mzl.xiwwwimc.png",
      username: user.username,
      profession: user.profession,
      password: user.password,
      email: user.email,
    },
    validationSchema: basicSchema,
    onSubmit
  })

  const handleAvatarChange = (event) => {
    setFieldValue("avatar", event.target.files[0]);
  };

  return (
    <div className="flex max-full justify-center">
      <div className="max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow-xl rounded-lg py-4 px-6">
            {values.avatar === "1672146784_new_preview_mzl.xiwwwimc.png" ? (<div className="flex justify-center">
              <div className="photo-wrapper p-4">
                <img
                  className="w-48 h-48 rounded-full mx-auto object-cover"
                  src={`${BASE_URL}/uploads/avatars/${user?.avatar}`}
                  alt="avatar"
                />
                <div className="flex justify-center mt-2">
                  <label htmlFor="avatar"
                         className="cursor-pointer bg-indigo-600 px-4 py-2 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200">
                    Change Avatar
                    <input
                      type="file"
                      id="avatar"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              </div>
            </div>) : (
              <div className="flex justify-center">
                <div className="photo-wrapper p-4">
                  <img
                    className="w-48 h-48 rounded-full mx-auto object-cover"
                    src={URL.createObjectURL(values.avatar)} alt=""
                  />
                  <div className="flex justify-center mt-2">
                    <label htmlFor="avatar"
                           className="cursor-pointer bg-indigo-600 px-4 py-2 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200">
                      Change Avatar
                      <input
                        type="file"
                        id="avatar"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="username"
                  className={errors.username && touched.username ? "w-full border rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border-red-600" : "w-full border rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"}
                  placeholder="Enter your name"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.username && touched.username && <p className="text-xs text-red-600">{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="profession" className="block text-gray-700 font-medium mb-1">
                  Profession
                </label>
                <input
                  type="text"
                  id="profession"
                  className={errors.profession && touched.profession ? "w-full border rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border-red-600" : "w-full border rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"}
                  placeholder="Enter your profession"
                  value={values.profession}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
               New Password
              </label>
              <input
                type="password"
                id="password"
                className={errors.password && touched.password ? "w-full border rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border-red-600" : "w-full border rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"}
                placeholder="••••••••"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && <p className="text-xs text-red-600">{errors.password}</p>}
            </div>
            <div className="mt-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={errors.email && touched.email ? "w-full border rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border-red-600" : "w-full border rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"}
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && <p className="text-xs text-red-600">{errors.email}</p>}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className={`${
                  Object.keys(errors).length > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } px-4 py-2 text-white rounded-lg transition-all duration-200`}
                disabled={Object.keys(errors).length < 0}
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserEditProfile;