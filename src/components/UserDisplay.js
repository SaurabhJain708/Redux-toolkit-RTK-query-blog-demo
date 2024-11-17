import React from 'react'
import { selectUserById } from '../features/post/userSlice'
import { useSelector } from 'react-redux'

const UserDisplay = (props) => {
    const author = useSelector(state=> selectUserById(state,props.userId))
  return (
    <>
     {author && author.name ? author.name : "Unknown"}
    </>
  )
}

export default UserDisplay
