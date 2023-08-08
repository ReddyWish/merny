import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { login } from "./authSlice.js";
import { Link, useNavigate } from 'react-router-dom';
import useInput from "../../hooks/useInput.js";
import useToggle from "../../hooks/useToggle.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, resetUser, usernameAttribs] = useInput("username", "")//useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false)

  useEffect(() => {
    usernameRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg("");
  }, [username, password])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await dispatch(login({ username, password }))
      resetUser();
      setPwd("");
      navigate("/dash");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized")
      } else {
        setErrMsg("Login Failed")
      }
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <p
        ref={errRef}
        className={`text-pink-500 ${errMsg ? "block" : "hidden"} mx-auto text-center bg-pink-100 p-4 rounded`}
      >
        {errMsg}
      </p>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign In
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your name
                </label>
                <input type="text"
                       id="username"
                       ref={usernameRef}
                       autoComplete="off"
                       { ...usernameAttribs }
                       placeholder="John Doe"
                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       required/>
              </div>

              <div className="relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <div className="relative">
                <input type={showPassword ? "text" : "password"}
                       id="password"
                       onChange={(e) => setPwd(e.target.value)}
                       value={password}
                       placeholder="••••••••"
                       className="bg-gray-50 min-w-10 border border-gray-300 text-gray-900sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-16 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       required/>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-0.5 transform -translate-y-1/2 focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="text-gray-500 hover:text-primary-600 dark:text-white dark:hover:text-blue-500"
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="persist"
                           type="checkbox"
                           onChange={toggleCheck}
                           checked={check}
                           value=""
                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <label htmlFor="persist" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                {/*<a href="#" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost*/}
                {/*  Password?</a>*/}
              </div>
              <button
                type="submit"
                disabled={!username || !password}
                className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${(!username || !password)
                  ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Sign In
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Don't have account yet? <Link to="/register" className="text-blue-700 hover:underline dark:text-blue-500">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>)
}

export default Login