import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter.jsx";
import PublicPosts from "./PublicPosts";
import Pagination from "../Pagination.jsx";

const Public = () => {
  const token = window.localStorage.getItem("token");
  const content = (
    <section>
      <PublicHeader/>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PublicPosts/>
      </div>
      {!token && <Pagination/>}
      <PublicFooter/>
    </section>
  );
  return content;
}

export default Public;