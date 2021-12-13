import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import TestButton from './components/Button/TestButton';
import LoginForm from './components/Login'
import Profile from './components/Profile/Profile';
import history  from './components/history';
import Home from './components/Home';
import AllProducts from './components/AllProducts/AllProducts';
import Favorite from './components/Favorite/Favorite';

function App() {
  return (
    // <BrowserRouter>
    // <Routes>
    // <Route exact path='/' element={<LoginForm/>}/>
    // </Routes>
    // </BrowserRouter>

  
    <Router history={history}>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path="/login" element={<LoginForm />}></Route>
        <Route exact path='/profile' element={<Profile/>}></Route>
        <Route exact path='/product' element={<AllProducts/>}></Route>
        <Route exact path='/favorite' element={<Favorite/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
