import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        alert('Login successful.');

      } else {
        const data = await response.json();
        alert(data.error || 'Login failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed.');
    }
  };

  return (
    <div className="login-container">
      <section id='log-section'>
        <form onSubmit={handleSubmit}>
          <label className='log-label' htmlFor="username">
            Username
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>

          <label className='log-label' htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <Link   to={`/Home`} >
                    <button id='log-button'>login</button>
                </Link>
        </form>
      </section>
    </div>
  );
}
