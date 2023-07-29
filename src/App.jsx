import { Routes, Route } from "react-router-dom";
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import Layout from "./components/Layout.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import MyPosts from "./features/posts/MyPosts.jsx";

import PersistLogin from "./components/PersistLogin.jsx";
import UsersPosts from "./features/users/UsersPosts.jsx";

import PostsList from "./features/posts/PostsList.jsx";
import EditPost from "./features/posts/EditPost.jsx";
import NewPost from "./features/posts/NewPost.jsx";
import Post from "./features/posts/Post.jsx";

import Public from "./components/public/Public.jsx";
import UsersList from "./features/users/UsersList.jsx";
import DashLayout from "./components/DashLayout.jsx";
import Welcome from "./features/auth/Welcome.jsx";
import PublicPost from "./components/public/PublicPost.jsx";
import Contacts from "./components/Contacts.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Public/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="contacts" element={<Contacts/>}/>
          <Route path="policy" element={<PrivacyPolicy/>}/>
          <Route path="public/:id" element={<PublicPost/>}/>

          <Route element={<PersistLogin/>}>

            <Route path="dash" element={<DashLayout/>}>
              <Route element={<RequireAuth allowedRoles={[2001, 1984, 5150]}/>}>
                <Route index element={<Welcome/>}/>

                <Route path="users">
                  <Route index element={<UsersList/>}/>
                  <Route path=":id" element={<UsersPosts/>}/>
                </Route>

                <Route path="posts">
                  <Route index element={<PostsList/>}/>
                  <Route path=":id" element={<Post/>}/>
                  <Route path="edit/:id" element={<EditPost/>}/>
                  <Route path="new" element={<NewPost/>}/>
                  <Route path="mine" element={<MyPosts/>}/>
                </Route>

              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      transition={Flip}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"/>
    </>
  )
}

export default App