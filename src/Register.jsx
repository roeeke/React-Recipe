import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'

export default function Register() {
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
            const response = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 201) {
                alert('User registered successfully.');
                setFormData({ username: '', password: '' });
            } else {
                const data = await response.json();
                alert(data.error || 'Registration failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed.');
        }
    };

    return (
        <div className="register-container">
            <section id='reg-section'>
                <form onSubmit={handleSubmit}>
                    <label className='reg-labl' htmlFor="username">
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

                    <label className='reg-labl' htmlFor="password">
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

                    <button id='reg-button' type='submit'>Register</button>
                </form>
            </section>
                <Link   to={`/Login`} >
                    <button id='go-login'>go to login</button>
                </Link>
        </div>
    );
}
