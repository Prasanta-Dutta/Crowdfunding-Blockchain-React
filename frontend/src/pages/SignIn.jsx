import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));    //  When typing/fill input field at that time userData value is set i.e. name,email,mobile,password
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Sign in logic (API call or validation)
        console.log("Logging in with", userData);
        axios.post('/api/user/login') //  when not using proxy http://localhost:4000/api/register
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Sign In
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-lg text-pretty font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={userData.email}
                            onChange={handleChange}
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-lg text-pretty font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={userData.password}
                            onChange={handleChange}
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-4 text-center text-lg text-pretty text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="link">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
