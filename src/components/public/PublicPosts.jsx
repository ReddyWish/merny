import { publicPostsArray } from "./publicPostsArray.js";
import PublicPostExcerpt from "./PublicPostExcerpt.jsx";

const PublicPosts = () => {

  const content = (
    publicPostsArray.map(publicPost => <PublicPostExcerpt key={publicPost._id} post={publicPost}/>)
  )
  return (
    <div className="flex justify-content items-center ">
      <div className="max-w-2xl w-full">
        {content}
      </div>
    </div>
  );
}

export default PublicPosts;