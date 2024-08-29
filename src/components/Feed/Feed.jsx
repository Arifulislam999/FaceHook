import { useEffect, useState } from "react";
import { useGetAllPostQuery } from "../../Redux/Features/Post/postAPI";
import PostModal from "../Modals/PostModal";
import FeedPost from "./FeedPost";
import FeedStatus from "./FeedStatus";
import Loading from "../Loader/Loading";

const Feed = () => {
  const [post, setPost] = useState([]);
  const { data: allPostData, isLoading, isError, error } = useGetAllPostQuery();

  useEffect(() => {
    setPost(allPostData?.data);
  }, [allPostData]);
  let content = null;

  if (isLoading && !isError) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <h2>{error?.message}</h2>;
  } else if (!isLoading && !isError && post?.length === 0) {
    content = <Loading />;
  } else {
    content = post?.map((p, i) => <FeedPost key={i} post={p} />);
  }
  return (
    <main className="mx-auto max-w-[1020px] py-4">
      <div className="container">
        <FeedStatus />
        <PostModal />

        {content}
      </div>
    </main>
  );
};

export default Feed;
