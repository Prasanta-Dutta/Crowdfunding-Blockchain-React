import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [userData, setuserData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

    const navigatePage = useNavigate();

    const handleChange = (e) => {
        setuserData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic here (API call or validation)
        console.log("Form Submitted", userData);
        axios.post('/api/user/register', userData) //  when not using proxy http://localhost:4000/api/register
            .then((res) => {
                console.log(res.data);
                if (res.status === 201) {
                    toast.success('Registration successful!', {
                        position: 'top-center',
                        autoClose: 3000,
                    });
                    setTimeout(() => navigatePage('/signin'), 1000);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(`❌ ${err.message}`, {
                    position: 'top-center',
                    autoClose: 3000,
                });
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-50 to-emerald-100 flex items-center justify-center px-4">
            <div className="relative bg-white shadow-2xl rounded-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">

                {/* Close Button */}
                <button
                    type="button"
                    aria-label="Close"
                    onClick={() => navigatePage("/")}
                    className="absolute top-4 left-4 bg-emerald-500 shadow-lg shadow-white text-white font-semibold hover:text-white hover:bg-emerald-700 p-2 rounded-full transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left Form Section */}
                <div className="w-full md:w-1/2 p-8">
                    <div className="text-3xl font-bold text-center text-emerald-600 mb-6">Sign Up</div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={userData.name}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={userData.email}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block font-medium text-gray-700">
                                Mobile
                            </label>
                            <input
                                type="tel"
                                name="mobile"
                                id="mobile"
                                value={userData.mobile}
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                required
                                className="w-full mt-1 p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={userData.password}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition"
                        >
                            Register
                        </button>
                    </form>
                </div>

                {/* Right Section */}
                <div className="hidden md:flex md:w-1/2 bg-emerald-600 text-white flex-col items-center justify-center p-8">
                    <h1 className="text-3xl font-bold mb-4">Gather & Grow</h1>
                    <blockquote className="italic text-center mb-6">
                        "A better tomorrow starts with your pledge today."
                    </blockquote>
                    <p className="text-lg">Already have an account?</p>
                    <Link to="/signin">
                        <button className="mt-3 bg-white text-emerald-600 font-semibold py-2 px-6 rounded hover:bg-emerald-100">
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
