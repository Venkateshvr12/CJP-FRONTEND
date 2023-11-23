// ViewPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function YourPosts(props) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
    const [toggle,setToggle]=useState(false);
    const [edit,setEdit]=useState(false);
    const [user, setUser] = useState(null);
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace 'userId' with the actual ID of the logged-in user
        const response = await axios.get('https://cjp-server.onrender.com/api/news');
        // console.log(response.data);
        let t=[]
        let count =0;
        response.data.map((val,index)=>{
            console.log(val.author,props.name)
            if(val.author===props.name.name) {
                console.log("entered")
                t[count]=val
                count+=1;
            }
        })
        setPosts(t);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [props,toggle]);
  const handleClick=()=>{
    setToggle(!toggle);
  }
  const handleBack = () => {
    // Navigate to the /profile route
    navigate('/profile');
  };

  const handleDelete=(data)=>{
    axios.delete('https://cjp-server.onrender.com/api/deletePost/'+data)
    .then((res)=>{
        if(res.status===200){
            alert("post deleted")
            window.location.reload()
        }
        else{
            Promise.reject()
        }
    }).catch((err)=>alert(err))
    console.log("deleted")
  }
  const handleEdit=(data)=>{
    console.log("entered")
    setEdit(true)
  } 
  const updateNewsArticle=(data)=>{
    const newsData = {
        headline: headline,
        author: props.name.name, // Assuming 'name' is the user's name
        post: description,
      };
    axios.put('https://cjp-server.onrender.com/api/updatePost/'+data,newsData)
    .then((res)=>{
        if(res.status===200){
            alert("post updated success")
            window.location.reload()
        }
        else{
            Promise.reject()
        }
    }).catch((err)=>alert(err))
}

  return (
    <div style={{margin:'200px',paddingTop:'500px'}}>
        <button onClick={handleBack} className='btn btn-dark'>
        Back
      </button>
      
      {posts.map((post) => (
        <div key={post.id}>
          
          <div class="card">
            <h5 class="card-header">{post.headline}</h5>
            <div class="card-body">
              <h6 class="card-title">author:{post.author}</h6>
              <p class="card-text">{post.post}</p>
              <button className='btn btn-success mr-3' onClick={() =>handleEdit(post._id)}>Edit</button>
              <button className='btn btn-danger' onClick={() => handleDelete(post._id)}>Delete</button>
                {
                    edit?(<>
                        <label>Headline:</label>
        <input
            defaultValue={post.headline}
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
        defaultValue={post.post}
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
          onClick={()=>updateNewsArticle(post._id)}

          className='btn btn-success'        >
          <b>Update Article</b>
        </button>
                    </>):null
                }
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

export default YourPosts;
