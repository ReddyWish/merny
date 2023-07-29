import { publicPostsArray } from "./publicPostsArray.js";
import PublicPostExcerpt from "./PublicPostExcerpt.jsx";

const PublicPosts = () => {

   const content = (
   publicPostsArray.map(publicPost => <PublicPostExcerpt key={publicPost._id} post={publicPost}/>)
  )
  return content;
}

export default PublicPosts;