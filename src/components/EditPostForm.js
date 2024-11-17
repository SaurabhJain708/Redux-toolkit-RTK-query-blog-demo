import React , { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers, useGetUsersQuery } from '../features/post/userSlice'
import { useNavigate, useParams } from 'react-router-dom'
import {selectPostbyId, useUpdatePostMutation } from '../features/post/postsSlice'


const EditPostForm = () => {
  const { isLoading, isError } = useGetUsersQuery();
  const [edit] = useUpdatePostMutation()
    const {id} = useParams()
    const postToBeUpdated = useSelector(state=>selectPostbyId(state,id))
    const user = useSelector(selectAllUsers)
    const navigate = useNavigate()
    const [formvalue,setFormvalue] = useState({
        topic: '',
        content: '',
        author: ''
    })
    const handleonchange = (e)=>{
        const {name,value} = e.target
        setFormvalue((prevState)=>({
            ...prevState,
            [name]: value
        }))
    }

    const handleeditformsubmit = (e)=>{
        e.preventDefault()
        edit({
          ...formvalue,
          reactions:postToBeUpdated.reactions
        })
        navigate('/')
    }

    useEffect(()=>{
        if(postToBeUpdated){
            setFormvalue({
                topic: postToBeUpdated.title,
                content: postToBeUpdated.body,
                author: postToBeUpdated.userId
            })
        }
    },[postToBeUpdated])
    if (isLoading) return <div>Loading users...</div>;
    if (isError) return <div>Error loading users!</div>;
  return (
    <div className="container mt-4">
    <div className="card bg-dark text-white">
      <div className="card-body">
        <h5 className="card-title">Edit Post</h5>
        <form onSubmit={handleeditformsubmit}>
          <div className="mb-3">
            <label htmlFor="postTitle" className="form-label">Topic</label>
            <input
              type="text"
              className="form-control"
              id="postTitle"
              placeholder="Enter the post topic"
              name='topic'
              value={formvalue.topic}
              onChange={handleonchange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="postContent" className="form-label">Content</label>
            <textarea
              className="form-control"
              id="postContent"
              rows="4"
              placeholder="Enter the post content"
              name='content'
              value={formvalue.content}
              onChange={handleonchange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="postAuthor" className="form-label">Author</label>
            <select className="form-select" id="postAuthor" name='author' required value={formvalue.author} onChange={handleonchange}>
              <option value={EditPostForm.author}>Select an author</option>
              {user.map((users)=>{
                return(
                  <option value={users.id} key={users.id}>{users.name}</option>
                )
              })}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default EditPostForm
