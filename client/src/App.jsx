import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Single from './pages/Single';
import Write from './pages/Write';
import MainLayout from './Layouts/MainLayout';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/post/:id" element={<Single />} />
        <Route path='/write' element={<Write/>}/>
        <Route path='/write/:postId' element={<Write/>}/>
        <Route path="/profile/:id" element={<Profile />}/>
      </Route>

    )
  );
  return <RouterProvider router={router}/>  
}

export default App;