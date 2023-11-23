// PostForm.js
import React from 'react';

function PostForm() {
  return (
    <div className="post-form" style={{ border: '2px solid green' }}>
      <h2>Post</h2>
      <input type="text" placeholder="Headline" />
      <textarea placeholder="News Content"></textarea>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="articleImage" style={{ whiteSpace: 'nowrap' }}>
          Upload Image:
        </label>
        <input type="file" id="articleImage" accept="image/*" style={{ marginLeft: '10px' }} />
      </div>

      <button type="submit" style={{ backgroundColor: 'skyblue', width: '100px', height: '30px' }}>
        Post Article
      </button>
    </div>
  );
}

export default PostForm;
