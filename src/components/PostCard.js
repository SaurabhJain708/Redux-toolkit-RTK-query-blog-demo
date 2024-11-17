import React from 'react'
import {useSelector} from "react-redux";
import {selectPostbyId, useDeletePostMutation} from "../features/post/postsSlice";
import UserDisplay from "./UserDisplay";
import { Link } from "react-router-dom";
import Reactions from './Reactions';

const PostCard = (props) => {
  const post = useSelector(state=> selectPostbyId(state,props.id))
  const [postDelete] = useDeletePostMutation()
  const handledelete =async()=>{
    console.log("Clicked")
    try{
     const result = await postDelete(post.id).unwrap()
     console.log(result)
    }catch(err){
      console.log(err)
    }
  }
  return (
        <div className="container mt-4" key={post.id}>
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body}</p>
              <div className="d-flex justify-content-between mb-2">
                <small>
                  Created by: <UserDisplay userId={post.userId} />
                </small>
                <small>
                  Created at:{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </small>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <Reactions reactions={post.reactions} id={post.id}/>
               </div>
              {/* New Section: View, Edit, Delete buttons */}
              <div className="d-flex justify-content-between">
                <Link
                  to={`/posts/${post.id}`}
                  className="btn btn-sm btn-outline-info me-2"
                >
                  View
                </Link>
                <Link
                  to={`/posts/edit/${post.id}`}
                  className="btn btn-sm btn-outline-warning me-2"
                >
                  Edit
                </Link>
                <button
                onClick={handledelete}
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )
  
}

export default PostCard;