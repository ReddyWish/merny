import Comment from "./Comment.jsx";
import { useSelector } from "react-redux";
import { selectComments } from "./commentsSlice.js";

function CommentsList() {
  const comments = useSelector(selectComments)

  const content = comments.map((comment) => <Comment key={comment?._id} comment={{ ...comment }} />);
  return content;
}

export default CommentsList;