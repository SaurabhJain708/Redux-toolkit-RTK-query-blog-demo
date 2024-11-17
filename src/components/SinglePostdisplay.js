import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostbyId } from '../features/post/postsSlice'
import { Link, useParams } from 'react-router-dom'
import UserDisplay from './UserDisplay'

const SinglePostdisplay = () => {
    const {id} = useParams()
    const selectedpost = useSelector(state=>selectPostbyId(state,id))
  return (
    <div className="container mt-4">
                <div className="card bg-dark text-white mb-3">
                <div className="card-body">
                  <h5 className="card-title">{selectedpost.title}</h5>
                  <p className="card-text">{selectedpost.body}</p>
                  <p className="">Created by: <UserDisplay userId={selectedpost.userId}/> | Created at: {selectedpost.createdAt}</p>
          
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="reactions">
                      <span className="badge bg-primary me-2">
                        <i className="bi bi-hand-thumbs-up"></i> {Object.values(selectedpost.reactions).reduce((acc,val)=>acc+val)}
                      </span>
                    </div>
                    <Link
                    to={`/posts/edit/${selectedpost.id}`}
                    className="btn btn-sm btn-outline-warning me-2"
                  >
                    Edit
                  </Link>
                    <span className="badge bg-warning text-dark">Reactions: {Object.values(selectedpost.reactions).reduce((acc,val)=>acc+val)}</span>
                  </div>
                </div>
              </div>
  </div>
  )
}

export default SinglePostdisplay
