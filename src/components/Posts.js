import { useSelector } from "react-redux";
import PostCard from "./PostCard";
import { selectids, useGetPostsQuery } from "../features/post/postsSlice";

const Posts = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()

  const orderedPostIds = useSelector(state=>selectids(state))
  let content

  if(isLoading){
    content= <h1>Loading</h1>
  }else if(isSuccess){
    content = orderedPostIds.map(id=>{
      return <PostCard id={id} key={id}/>
    })
  }else if(isError){
    content = <h1>Error: {error?.data?.message}</h1>
    console.log({ orderedPostIds });
console.log({ error });
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default Posts;