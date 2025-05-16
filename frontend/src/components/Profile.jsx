import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ username = "Profile" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        navigate("/logout"); 
        return;
    };

    const handleMyCampaign = () => {

    }

    const handleProfile = () => {
        
    }

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="h-12 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:text-teal-200 focus:ring-4 focus:ring-gray-100 font-semibold rounded shadow-md text-sm px-6 py-2.5 me-2.5 my-auto dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
                {username}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-emerald-200 rounded-md shadow-lg z-50">
                    <button
                        onClick={handleProfile}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50"
                    >
                        My Profile
                    </button>
                    <button
                        onClick={handleMyCampaign}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50"
                    >
                        My Campaigns
                    </button>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
