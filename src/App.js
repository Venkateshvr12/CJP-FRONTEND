import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UserForm from './components/UserForm';
import PostForm from './components/PostForm'; // Keep this component
import RegisterForm from './components/RegisterForm';
import UserProfile from './components/UserProfile'; // Create this component
import ViewPosts from './components/ViewPosts'; // Create this component
import YourPosts from './components/YourPost';
import {useState} from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [data,setData]=useState({})
  useEffect(()=>{
    
const storedKey = localStorage.getItem('key');
if (storedKey) {
        setData(JSON.parse(storedKey));
      }
  },[])
  const getData=(data)=>{
    setData(data);
    localStorage.setItem('key', JSON.stringify(data));
  }
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="background-image">
          <Routes>
            <Route path="/" element={<UserForm setData={getData}/>} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/post" element={<PostForm />} />
            <Route path="/profile" element={<UserProfile obj={data}/>} />
            <Route path="/view-posts" element={<ViewPosts />} />
            <Route path="/your-posts" element={<YourPosts name={data}/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;