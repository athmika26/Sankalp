import React, { useState } from 'react';
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
                <p className="text-lg text-gray-700 opacity-90">
                    Log in to access your dashboard and continue your journey with us.
                </p>
            </div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-semibold"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
