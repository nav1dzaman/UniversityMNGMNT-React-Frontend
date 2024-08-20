import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom';
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home.jsx"
import AdminHome from "./pages/admin/AdminHome.jsx"
import StudentDash from './pages/student/StudentDash.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import FacultyPanel from './pages/faculty/FacultyPanel.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import FacultyLogin from './pages/faculty/FacultyLogin.jsx';
import AdminRoute from './routing/AdminRoute.jsx';
import StudentRoute from './routing/StudentRoute.jsx';
import FacultyRoute from './routing/FacultyRoute.jsx';

import { useAuth } from './auth/AuthProvider.jsx';
function App() {
  const { loggedIn } = useAuth();

  return (
    <>
<Header/>

   <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="faculty" element={<FacultyLogin/>}></Route>
        <Route path="admin" element={<AdminLogin/>}></Route>

        <Route path="adminpanel" element={<AdminRoute><AdminHome/></AdminRoute>}></Route>

        {/* <Route path="adminpanel" element={<AdminHome/>}></Route> */}
        <Route path="studentpanel" element={<StudentRoute><StudentDash/></StudentRoute>}></Route>
        <Route path="facultypanel" element={<FacultyRoute><FacultyPanel/></FacultyRoute>}></Route>

        <Route path="*" element={<ErrorPage/>}></Route>
        {/* <Route path='studentpanel' element={<StudentDash/>} </Route> */}
        {/* <Route path="products/1001" element={<ProductDetail />}></Route>
        <Route path="contact" element={<Contact />}></Route> */}
      </Routes>


   {/* <Footer/> */}
   

    </>
  )
}

export default App
