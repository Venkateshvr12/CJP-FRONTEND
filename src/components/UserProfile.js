//UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProfile(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const name=props.obj.name;
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post('https://cjp-server.onrender.com/userLogin/login', {
          name: user && user.name,
          email: user && user.email,
        });

        // Log the entire response to check the structure
        console.log('User Info Response:', response);

        // Check if the response has data and a name property
        if (response.data && response.data.name) {
          setUser(response.data);

          // Log user name to console after setting the user data
          console.log('User Name:', response.data.name);
        } else {
          console.error('Invalid user information response:', response);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    // Fetch user info only if the user is not already set
    if (!user) {
      fetchUserInfo();
    }
  }, [user]);

  const submitNewsArticle = async () => {
    try {
      // Assuming you have 'headline', 'description', and 'image' state variables
      const newsData = {
        headline: headline,
        author: name, // Assuming 'name' is the user's name
        post: description,
        // image: 'path/to/image.jpg', // Update with the actual image path or handling logic
      };
      console.log('Post Data:', newsData);
      const response = await axios.post('https://cjp-server.onrender.com/newsRoute/create-news', newsData);
  
      // Log the entire response to check the structure
      console.log('News Article Response:', response);
  
      // Check if the response has data and a headline property
      if (response.data && response.data.headline) {
        alert('News article submitted successfully!');
      } else {
        console.error('Invalid news article response:', response);
      }
    } catch (error) {
      console.error('Error submitting news article:', error);
    }
  };
  

  const handleLogout = () => {
    // Logout logic
    navigate('/');
  };

  const handleViewPosts = () => {
    // Navigate to the ViewPosts component
    navigate('/view-posts');
  };
  const handleYourPosts=()=>{
    navigate('/your-posts')
  }

  return (
    <div style={{backgroundColor:'lightgreen',padding:'20px',margin:'20px'}}>
      <h2 >Welcome {name}!</h2>

      {/* ViewPosts button */}
      <button className='btn btn-warning'
        onClick={handleViewPosts}
      >
        <b>View all Posts</b>
      </button>

      {/* Logout button */}
      <button className='btn btn-primary mx-3'
      onClick={handleYourPosts}>
        Your posts
      </button>
      <button className='btn btn-danger'
        onClick={handleLogout}
      >
        <b>Logout</b>
      </button>
      

      {/* News article submission form */}
      <div style={{ border: '2px solid red', padding: '10px', marginTop: '20px'}}>
        <h2>Submit News Article</h2>
        <label>Headline:</label>
        <input
          type="text"
          style={{ width: '90%' }}
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          required
        />
        <br />
        <br />
        <label>Description:</label>
        <textarea
          value={description}
          style={{ width: '90%' }}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <br />
        
        <br />
        <br />
        <button
          onClick={submitNewsArticle}
          className='btn btn-success'        >
          <b>Submit Article</b>
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
