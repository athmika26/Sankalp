// src/components/SignupPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInsstance';

const SignupPage = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(`/auth/signup`, form);
            alert("Signup successful! Redirecting to Dashboard...");
            navigate('/dashboard');
        } catch (error) {
            alert("Error signing up. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-lg" required />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-lg" required />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-lg" required />
                <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;
