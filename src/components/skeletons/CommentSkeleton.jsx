const CommentSkeleton = () => {
  return (
    <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="h-4 w-20 ml-2 bg-gray-300 animate-pulse rounded"></div>
        </div>
        <div className="h-4 w-24 bg-gray-300 animate-pulse rounded"></div>
      </footer>
      <div className="h-16 w-full animate-pulse bg-gray-300 rounded"></div>
    </article>
  );
};

export default CommentSkeleton;