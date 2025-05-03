import React, { useState } from "react";
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [userData, setuserData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

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
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Sign Up
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-lg text-pretty font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={userData.name}
                            onChange={handleChange}
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-lg text-pretty font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={userData.email}
                            onChange={handleChange}
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="mobile" className="block text-lg text-pretty font-medium text-gray-700">
                            Mobile
                        </label>
                        <input
                            type="tel"
                            name="mobile"
                            id="mobile"
                            required
                            pattern="[0-9]{10}"
                            value={userData.mobile}
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
                            name="password"
                            id="password"
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
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-lg text-pretty text-gray-600">
                    Already have an account?{" "}
                    <Link to="/signin" className="link">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
