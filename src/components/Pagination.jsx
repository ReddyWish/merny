import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Pagination = (props) => {
  const notify = () => toast.info("Please SignIn if you like to read the posts 👇")
  const token = localStorage.getItem("token")

  const linkClass = "text-white font-bold no-underline";
  const content = (
    token ? (<button onClick={props.onClick}
                     className="w-full py-2 px-4 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md font-bold">
        <Link className={linkClass} to="/dash/posts">Load more posts</Link></button>)
      : (<button onClick={notify} className="w-full py-2 px-4 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md font-bold"><Link
        className={linkClass} to="/login">Load more posts</Link></button>)
  )
  return content;
}

export default Pagination;