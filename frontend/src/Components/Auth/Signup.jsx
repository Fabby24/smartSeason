import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Sprout, Mail, Lock, User, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        full_name: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await api.post('/auth/signup', {
                username: formData.username,
                email: formData.email,
                full_name: formData.full_name,
                password: formData.password
            });
            
            const { token, user } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userRole', user.role);
            
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            toast.success('Account created successfully! Welcome aboard!');
            
            // Redirect to dashboard after 1 second
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
            
        } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo and Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-2xl shadow-lg mb-4">
                        <Sprout className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">SmartSeason</h1>
                    <p className="text-gray-600 mt-2">Create your account</p>
                </div>
                
                {/* Signup Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username *
                            </label>
                            <div className="relative">
                                <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                    placeholder="Choose a username"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                    placeholder="Minimum 6 characters"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                                Sign In
                            </Link>
                        </p>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="text-xs text-center text-gray-500">
                            <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
                            <p className="mt-2">Field Agent accounts are subject to admin approval</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;