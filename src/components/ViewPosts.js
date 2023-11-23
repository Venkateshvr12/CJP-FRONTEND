// ViewPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace 'userId' with the actual ID of the logged-in user
        const response = await axios.get('https://cjp-server.onrender.com/api/news');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleBack = () => {
    // Navigate to the /profile route
    navigate('/profile');
  };

  return (
    <div style={{margin:'200px', paddingTop:'500px'}}>
       <div><button onClick={handleBack} className='btn btn-dark ms-auto'>
        Back
      </button></div>
      <h2 style={{backgroundColor:'lightgreen'}} className='d-inline'>All Posts</h2><br></br>
      {posts.map((post) => (
        <div key={post.id}>
          
          <div class="card">
            <h5 class="card-header">{post.headline}</h5>
            <div class="card-body">
              <h6 class="card-title">author:{post.author}</h6>
              <p class="card-text">{post.post}</p>
            </div>
          </div>

          {/* Additional post details can be displayed here */}
          <hr />
        </div>
      ))}

      {/* Back button */}
     
    </div>
  );
}

export default ViewPosts;
