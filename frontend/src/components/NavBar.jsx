"use client";
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ConnectWallet, Logo, Profile } from './index';
import Menu from './Menu';
import Close from './Close';
import LogInContext from '../context/LogInContext';


function NavBar() {
    const menuList = ["News", "Explore Campaigns", "Start Campaign", "Story"];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const logInStatus = useContext(LogInContext);
    const paths = ["/news", "/explore-campaigns", "/start-campaign", "/story"];

    const changeCloseBtn = () => {
        setIsMenuOpen(false);
        document.getElementById('menu_btn').classList.remove('hidden');
    }

    return (
        <div className="backgroundMain">
            <div className="px-4 py-5 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-8 lg:px-8">
                <div className="hidden lg:flex relative  items-center justify-between">
                    <div className="flex items-center">
                        <a href="/" aria-label="Donator" title='Donator' className="inline-flex items-center mr-8">
                            <Logo color="text-white" />
                            <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                                Donator
                            </span>
                        </a>
                        <ul className="flex items-center space-x-8 lg:flex">
                            {
                                menuList.map((item, index) => (
                                    <li key={index + 1}>
                                        <Link
                                            to={paths[index]}
                                            className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-200 hover:font-semibold"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {
                        !logInStatus.isLoggedIn && (
                            <ul className="flex items-center space-x-8 lg:flex ">
                                <li>
                                    <Link
                                        to="/signup"
                                        className="h-12 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:text-teal-200 focus:ring-4 focus:ring-gray-100 font-semibold rounded shadow-md text-sm px-6 py-2.5 me-2.5 my-auto dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                            </ul>
                        )
                    }

                    {
                        logInStatus.isLoggedIn && (
                            <ul className="flex items-center space-x-8 lg:flex ">
                                <li>
                                    <Link to={"/logout"} >
                                    <button
                                        className="h-12 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:text-teal-200 focus:ring-4 focus:ring-gray-100 font-semibold rounded shadow-md text-sm px-6 py-2.5 me-2.5 my-auto dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    >
                                        Logout
                                    </button>
                                    </Link>


                                    <Profile />

                                    <ConnectWallet />

                                    {
                                        logInStatus.isVerified ? (
                                            <img src="verified2.png" alt="" title="Verified" className="h-12 rounded shadow-md  me-2.5 my-auto text-center inline-flex " />
                                        )
                                            : (
                                                <Link to={"/verification"} >
                                                    <button
                                                        className="h-12 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:text-green-600 focus:ring-4 focus:ring-gray-100 font-semibold rounded shadow-md text-sm px-6 py-2.5 me-2.5 my-auto dark:bg-gray-800 dark:text-green-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                    >
                                                        Verify
                                                    </button>
                                                </Link>
                                            )
                                    }

                                </li>
                            </ul>
                        )
                    }
                </div>


                {/* Responsive Design */}
                <div className="lg:hidden px-4 py-5 mx-auto w-full sm:max-w-xl md:max-w-full lg:px-8">
                    <button className='p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline' aria-label='Open Menu' title='Open Menu' id='menu_btn' onClick={() => {
                        setIsMenuOpen(true);
                        document.getElementById('menu_btn').classList.add('hidden');
                    }}>
                        <Menu />
                    </button>
                    {
                        isMenuOpen && (<>
                            <div className='absolute top-0 left-0 w-full'>
                                <div className='p-5 bg-white border rounded shadow-md'>
                                    <div className='flex items-center just mb-4'>
                                        <div>
                                            <a href="/" aria-label='Donator' title='Donator' className='inline-flex items-center'>
                                                <Logo color="text-black" />
                                                <span className='ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase'>
                                                    Donator
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            document.getElementById('menu_btn').classList.remove('hidden') ;
                                        }}
                                        className="absolute top-1/4 right-5 bg-slate-200 shadow-md shadow-slate-400 text-slate-800 font-semibold hover:bg-slate-300 p-2 rounded-full transition"
                                    >
                                        <Close />
                                    </button>
                                </div>
                            </div>
                            <nav className='mt-28'>
                                <ul className='space-y-4'>
                                    {
                                        menuList.map((item, index) => (
                                            <li key={index + 1}>
                                                <Link
                                                    to={paths[index]}
                                                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-200 hover:font-semibold"
                                                    onClick={changeCloseBtn}
                                                >
                                                    {item}
                                                </Link>
                                            </li>
                                        ))
                                    }

                                    <li>
                                        <Link
                                            to="/signup"
                                            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-500 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none background"
                                            onClick={changeCloseBtn}
                                        >
                                            Sign up
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </>)
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;
