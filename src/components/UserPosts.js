import {useGetPostsByUserIdQuery } from '../features/post/postsSlice'
import { Link, useParams } from 'react-router-dom'

const UserPosts = () => {
    const {id} = useParams()

    const {
      data: Result,
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetPostsByUserIdQuery(id);

    let content

    if(isLoading){
      content = <h1>Loading</h1>
    }else if(isError){
      content = <h1>Server Error:{error}</h1>
    }else if(isSuccess){
      const {ids,entities} = Result
      content= <ul className="list-group">
      {ids.map((id) => {
        return (
          <li className="list-group-item bg-dark text-white" key={id}>
            <Link to={`/posts/${id}`} className="text-decoration-none text-white">
              {entities[id].title}
            </Link>
          </li>
        )
      })}
    </ul>
    }

  return (
    <div className="container mt-4">
    {content}
  </div>
  )
}

export default UserPosts;
