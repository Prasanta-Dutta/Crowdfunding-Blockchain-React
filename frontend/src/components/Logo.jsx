import React from "react";

const Logo = ({ color }) => {
    return (
        <svg
            className={`w-8 ${color} text-teal-accent-400`}
            viewBox="0 0 64 64"
            strokeLinejoin="round"
            strokeWidth="3"
            strokeLinecap="round"
            strokeMiterlimit="10"
            stroke="currentColor"
            fill="none"
        >
            {/* <!-- Heart shape --> */}
            <path d="M32 12c-4-8-16-6-16 4 0 6 8 12 16 20 8-8 16-14 16-20 0-10-12-12-16-4z" />

            {/* <!-- Two hands --> */}
            <path d="M20 40c-2 2-4 4-6 8" />
            <path d="M44 40c2 2 4 4 6 8" />

            {/* <!-- Base platform --> */}
            <rect x="20" y="52" width="24" height="4" rx="1" />
        </svg>

    );
};

export default Logo;
