import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { register } from "./authSlice.js";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios.js";

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [passwordFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidName(result);
  }, [username])

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd])

  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      dispatch(register({ username, password }));
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        });
      console.log(response.data);
      // console.log(response.accessToken);
      setSuccess(true);
      // clear input fields
    } catch (err) {
      if (!err.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken")
      } else {
        setErrMsg("Registration failed")
      }
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Success</h1>
          <p>
            <Link to="/login">Log In</Link>
          </p>
        </section>
      ) : (
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
                  Create an account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your name
                      {validName && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="ml-2 text-green-500"
                        />
                      )}
                      {!validName && username && (
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="ml-2 text-red-500"
                        />
                      )}
                    </label>
                    <input type="text"
                           id="username"
                           ref={usernameRef}
                           autoComplete="off"
                           onChange={(e) => setUsername(e.target.value)}
                           aria-invalid={validName ? "false" : "true"}
                           aria-describedby="uidnote"
                           onFocus={() => setUsernameFocus(true)}
                           onBlur={() => setUsernameFocus(false)}
                           placeholder="John Doe"
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required/>
                    <p id="uidnote"
                       className={`mt-1 text-sm ${usernameFocus && username && !validName ? "block bg-slate-50 p-2 rounded" : "hidden"}`}>
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-500"/>
                      3 to 24 characters.<br/>
                      Must begin with a letter.<br/>
                      Letters, numbers, underscores, hyphens allowed.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                      {validPwd && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="ml-2 text-green-500"
                        />
                      )}
                      {!validPwd && password && (
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="ml-2 text-red-500"
                        />
                      )}
                    </label>
                    <input type="password"
                           id="password"
                           onChange={(e) => setPwd(e.target.value)}
                           aria-invalid={validPwd ? "false" : "true"}
                           aria-describedby="passwordnote"
                           onFocus={() => setPwdFocus(true)}
                           onBlur={() => setPwdFocus(false)}
                           placeholder="••••••••"
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required/>
                    <p id="uidnote"
                       className={`mt-1 text-sm ${passwordFocus && password && !validPwd ? "block bg-slate-50 p-2 rounded" : "hidden"}`}>
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-500"/>
                      8 to 24 characters.<br/>
                      Must include uppercase and lowercase letters, a number and a special character.<br/>
                      Allowed special characters: <span aria-label="exclamation mark">!</span> <span
                      aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span
                      aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                  </div>

                  <div>
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Confirm Password
                      {validMatch && matchPwd && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="ml-2 text-green-500"
                        />
                      )}
                      {!validMatch && matchPwd && (
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="ml-2 text-red-500"
                        />
                      )}
                    </label>
                    <input type="password"
                           id="confirm_password"
                           onChange={(e) => setMatchPwd(e.target.value)}
                           aria-invalid={validMatch ? "false" : "true"}
                           aria-describedby="confirmnote"
                           placeholder="••••••••"
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required/>
                    <p id="confirmnote"
                       className={`mt-1 text-sm ${matchPwd && !validMatch ? "block bg-slate-50 p-2 rounded" : "hidden"}`}>
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-500"/>
                      Must match the first password input field
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={!validName || !validPwd || !validMatch}
                    className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${(!validName || !validPwd || !validMatch)
                      ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Create an account
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have account? <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">Sign In</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>)
      }
    </>
  )
}

export default Register