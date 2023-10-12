import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import DangKy from './Pages/DangKy/DangKy';
import PrivateRoute from './Components/hooks/PrivateRoute';
import XacThuc from './Pages/DangKy/XacThuc';



function App() {


  return (<>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/DangKy' element={<DangKy />} />
      <Route path='/xacthuc' element={<XacThuc />} />

      <Route path='/home' element={<PrivateRoute />} >
        <Route path='/home' element={<Home />} />

      </Route>


    </Routes>
  </>
  );
}

export default App;