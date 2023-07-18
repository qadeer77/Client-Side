import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3000/signup', {
            username,
            password,
            role,
          }, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
          
          console.log(response.data);
          

      if (response.data.role === 'creator') {
        await createPost();
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const createPost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', 'Example Title');
      formData.append('description', 'Example Description');
      formData.append('image', 'example.jpg');

      const response = await axios.post('http://localhost:3000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {role === 'creator' && (
          <>
            <div className="form-group">
              <label htmlFor="title">Post Title:</label>
              <input type="text" id="title" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Post Description:</label>
              <textarea id="description" rows="4" />
            </div>
            <div className="form-group">
              <label htmlFor="image">Post Image:</label>
              <input type="file" id="image" accept="image/*" />
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="viewer">Viewer</option>
            <option value="creator">Creator</option>
          </select>
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
