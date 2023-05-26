import './App.css';
import { React, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login/login';
import Home from './components/home/home';
import { initializeApp } from "firebase/app";
import Register from './components/register/register';
import Header from './components/header/header';
import Profile from './components/profile/profile';

function App() {
  // const [url, setUrl] = useState("http://192.168.1.137:6090")
  const [url, setUrl] = useState("https://jointscounter.com:6090")
  const [user, setUser] = useState(null)
  const [isLogged, setIsLogged] = useState(false)
  const [tasks, setTasks] = useState([])

  const firebaseConfig = {
    apiKey: "AIzaSyBjpQ5kUI_PJ5BggLzn0ScoXpqTBzQ4cYo",
    authDomain: "taskweb-938e7.firebaseapp.com",
    projectId: "taskweb-938e7",
    storageBucket: "taskweb-938e7.appspot.com",
    messagingSenderId: "896698526786",
    appId: "1:896698526786:web:0d3787d162ae4ef57391db"
  };

  useEffect(() => { initializeApp(firebaseConfig) }, []);

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
          <Header user = {user} tasks = {tasks} setTasks = {setTasks}></Header>
          <Routes>
            <Route path='home' element={<Home tasks = {tasks} setTasks = {setTasks} url={url} user={user}/>}></Route>
            <Route path='profile' element={<Profile url={url} user={user}/>}></Route>
            <Route path='*' element={<Navigate to='/home' />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
