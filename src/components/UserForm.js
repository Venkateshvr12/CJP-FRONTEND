// UserForm.js
import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';

function UserForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage] = useState('');
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate(); // Import the useNavigate hook

  const handleLogin = () => {
    const data = { email: email };
    Axios.post('https://cjp-server.onrender.com/userLogin/login', data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          const name = res.data.name;
          const data = { name: name };
          props.setData(data);
          setData(data);
          setLogin(true);
          navigate('/profile'); // Use navigate here
        } else {
          return Promise.reject();
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      {login ? (
        <UserProfile obj={data} />
      ) : (
        <div className="user-form" style={{ textAlign: 'center', maxWidth: '400px', height: 'auto', margin: 'auto', border: '2px solid green' }}>
          <h2>Login</h2>

          <label>
            Email:
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '90%', marginBottom: '10px', padding: '13px' }}
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '90%', marginBottom: '10px', padding: '5px' }}
            />
          </label>

          <button
            type="button"
            style={{ backgroundColor: 'blue', color: 'white', width: '30%', height: '30px', marginBottom: '10px' }}
            onClick={handleLogin}
          >
            Login
          </button>

          {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}

          <p style={{ marginTop: '10px' }}>
            Don't have an account? <Link to="/register">Register here</Link>.
          </p>
        </div>
      )}
    </div>
  );
}

export default UserForm;
