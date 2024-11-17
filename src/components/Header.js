import React from 'react'
import { Link } from 'react-router-dom'
import { useGetUsersQuery } from '../features/post/userSlice';

const Header = () => {
  useGetUsersQuery()
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="/">NoteSpot</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/posts">Add Post</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/user">Users</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/linkpage">LinkPage</Link>
      </li>
    </ul>
  </div>
</nav>
  </div>
  )
}
 
export default Header
