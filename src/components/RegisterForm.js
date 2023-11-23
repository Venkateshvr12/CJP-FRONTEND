// RegisterForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegisterForm({ onSuccessfulRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://cjp-server.onrender.com/userRegister/register', {
        name,
        email,
        password,
      });
      if (response.data.message === 'Registration successful') {
        alert(response.data.message);
        if (typeof onSuccessfulRegister === 'function') {
          onSuccessfulRegister();
        }
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="register-form" style={{ textAlign: 'center', maxWidth: '400px', margin: 'auto', border:'2px solid green',backgroundColor:'white',marginTop:'20px',paddingTop:'20px'}}>
      <h2>Register Form</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: '90%', marginBottom: '10px', padding: '5px' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '90%', marginBottom: '10px', padding: '5px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '90%', marginBottom: '10px', padding: '5px' }}
      />
      <button
        type="button"
        style={{ backgroundColor: 'green', color: 'white', width: '40%', height: '30px', marginBottom: '10px' }}
        onClick={handleRegister}
      >
        Register
      </button>
      {errorMessage && (
        <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
      )}

      <p style={{ marginTop: '10px' }}>
        Already have an account? <Link to="/">Login here</Link>.
      </p>

      {/* Add the "Register here" link */}
     
    </div>
  );
}

export default RegisterForm;
