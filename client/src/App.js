import './App.css';
import { React, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login/login';
import Home from './components/home/home';
import Register from './components/register/register';

function App() {
  // const [url, setUrl] = useState("http://localhost:3090")
  const [url, setUrl] = useState("https://jointscounter:6090")
  const [user, setUser] = useState(null)
  const [isLogged, setIsLogged] = useState(false)

  if (!isLogged) {
    return (
      <>
        <BrowserRouter>
          <div className='main'>
            <Routes>
              <Route path='login' element={<Login url={url} setIsLogged={setIsLogged} setUser={setUser}/>}></Route>
              <Route path='register' element={<Register url={url}/>}></Route>
              <Route path='*' element={<Navigate to='/login' />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </>
    )
  }

  return (
    <>
      <BrowserRouter>
        <div className='main'>
          <Routes>
            <Route path='home' element={<Home url={url} user={user}/>}></Route>
            <Route path='*' element={<Navigate to='/home' />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
