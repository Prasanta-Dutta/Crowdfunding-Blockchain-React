import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogInContext from '../context/LogInContext';
import { toast } from 'react-toastify';

export default function Verification() {
    const [aadharData, setAadharData] = useState({
        aadharNumber: '',
        mobile: '',
    });

    const navigatePage = useNavigate();
    const {setIsVerified} = useContext(LogInContext);

    const handleChange = (e) => {
        setAadharData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/user/verify-user', aadharData, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    toast.success('Verified!', {
                        position: 'top-center',
                        autoClose: 3000,
                    });
                    setIsVerified(true);
                    setTimeout(() => navigatePage('/'), 1000);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(`❌ ${err.message}`, {
                    position: 'top-center',
                    autoClose: 3000,
                });
                setIsVerified(false);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center text-indigo-600">Aadhaar Verification</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Aadhaar Number */}
                    <div>
                        <label htmlFor="aadhaar" className="block text-gray-700 font-medium">Aadhaar Number</label>
                        <input
                            type="text"
                            name="aadharNumber"
                            id="aadharNumber"
                            value={aadharData.aadharNumber}
                            onChange={handleChange}
                            pattern="\d{12}"
                            required
                            maxLength={12}
                            className="w-full mt-1 p-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter 12-digit Aadhaar number"
                        />
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label htmlFor="mobile" className="block text-gray-700 font-medium">Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile"
                            id="mobile"
                            value={aadharData.mobile}
                            onChange={handleChange}
                            pattern="\d{10}"
                            required
                            maxLength={10}
                            className="w-full mt-1 p-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter 10-digit mobile number"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Verify Aadhaar
                    </button>
                </form>
            </div>
        </div>
    );
}
