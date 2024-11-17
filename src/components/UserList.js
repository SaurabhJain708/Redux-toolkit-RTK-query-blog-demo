import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllUsers } from '../features/post/userSlice'

const UserList = () => {
    const user = useSelector(state=>selectAllUsers(state))
  return (
    <div className="container mt-4">
      <ul className="list-group">
        {user.map((elem) => {
          return (
            <li className="list-group-item bg-dark text-white" key={elem.id}>
              <Link to={`/user/${elem.id}`} className="text-decoration-none text-white">
                {elem.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserList
