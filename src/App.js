import './App.css';
import CreatePostsforms from './components/CreatePostsforms';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import SinglePostdisplay from './components/SinglePostdisplay';
import EditPostForm from './components/EditPostForm';
import UserList from './components/UserList';
import UserPosts from './components/UserPosts';
import Posts from './components/Posts';
import RequireAuth from './components/Protection/Elements/RequireAuth'
import Login from './components/Protection/Elements/Login';
import UnAuthorised from './components/Protection/Elements/UnAuthorised';
import SignUp from './components/Protection/Elements/SignUp';
import LinkPage from './components/Protection/Elements/LinkPage'
import Missing from './components/Protection/Elements/Missing'
import Editor from './components/Protection/Elements/Editor'
import Admin from './components/Protection/Elements/Admin'
import PersistLogin from './components/Protection/Elements/PersistLogin';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='login' element={<Login/>}/>
        <Route index element={<Posts/>}/>
        <Route path='linkpage' element={<LinkPage/>}/>
        <Route element={<RequireAuth allowedRoles={'user'}/>}>
        <Route element={<PersistLogin/>}>
        <Route element={<RequireAuth allowedRoles={'Admin'}/>}>
        <Route path='Admin' element={<Admin/>}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={Editor}/>}>
        <Route path='Editor' element={<Editor/>}/>
        </Route>
        <Route path='unauthorised' element={<UnAuthorised/>}/>
        <Route path='user'>
        <Route index element={<UserList/>}/>
        <Route path=':id' element={<UserPosts/>}/>
        </Route>
        <Route path='posts'>
          <Route index element={<CreatePostsforms/>}/>
          <Route path='edit/:id' element={<EditPostForm/>} />
          <Route path=':id' element={<SinglePostdisplay/>}/>
        </Route>
        </Route>
        </Route>
        <Route path='*' element={<Missing/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;