import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import AddBlog from './components/AddBlog';
import Blogs from './components/Blogs';

function App() {
  return (
    <div>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/sign' element={<Signup/>}/>
      <Route path='/blogs' element={<Main child={<Blogs/>}/>}/>
      <Route path='/add' element={<Main child={<AddBlog method="post" data={{blogtitle: "",
    blogdiscription: "",
    blogimgurl: ""}}/>}/>}/>
     </Routes>
    </div>
  );
}

export default App;
