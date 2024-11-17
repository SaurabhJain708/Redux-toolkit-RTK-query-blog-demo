import React, { useState } from 'react'
import { selectAllUsers, useGetUsersQuery } from '../features/post/userSlice'
import { useAddNewPostMutation } from '../features/post/postsSlice'
import { useSelector } from 'react-redux'

const CreatePostsforms = () => {
  const { isLoading, isError } = useGetUsersQuery();
  const [postAdded] = useAddNewPostMutation()
    const user = useSelector(state=>selectAllUsers(state))
    console.log(user)
    const [formvalue,setFormvalue] = useState({
        topic: '',
        content: '',
        author: ''
    })

    const handleaddform = (e)=>{
        e.preventDefault()
        postAdded(formvalue)
        setFormvalue({
          topic: '',
          content: '',
          author: ''
        })
    }

    const handleonchange = (e)=>{
        const {name,value} = e.target
        setFormvalue((prevState)=>({
            ...prevState,
            [name]: value
        }))
    }
    
    if (isLoading) return <div>Loading users...</div>;
    if (isError) return <div>Error loading users!</div>;
  return (
  <div className="container mt-4">
    <div className="card bg-dark text-white">
      <div className="card-body">
        <h5 className="card-title">Add a New Post</h5>
        <form onSubmit={handleaddform}>
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
              <option value="">Select an author</option>
              {user.map((users)=>{
                return(
                  <option value={`${users.id}`} key={users.id}>{users.name}</option>
                )
              })}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Add Post</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default CreatePostsforms
