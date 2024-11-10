// src/components/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInsstance';

const LoginPage = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`/auth/login`, form);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert("Error logging in. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Login</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-lg" required />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-lg" required />
                <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
