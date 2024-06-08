import { useState } from 'react'
import './App.css'
import {
  RouterProvider,
  NavLink,
  Router,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import { AuthProvider } from "./context/AuthProvider.jsx";
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './components/Home.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}  >
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route exact path='/home' element={<ProtectedRoute component={Home}/>}/>
  </Route>
  )
);
function App() {


  return (
    <>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
