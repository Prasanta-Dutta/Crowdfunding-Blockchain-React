"use client";
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Menu from './Menu';
import Close from './Close';

function NavBar() {
    const menuList = ["News", "Explore Campaigns", "Start Campaign", "Story"];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const paths = ["/news", "/explore-campaigns", "/start-campaign", "/story"];

    const changeCloseBtn = () => {
        setIsMenuOpen(false);
        document.getElementById('menu_btn').classList.remove('hidden');
    }

    return (
        <div className="backgroundMain">
            <div className="px-4 py-5 mx-autoi sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="hidden md:flex relative  items-center justify-between">
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
                        !isLoggedIn && (
                            <ul className="flex items-center space-x-8 lg:flex ">
                                <li>
                                    <Link
                                        to="/signup"
                                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-500 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none background"
                                    >
                                        Sign up
                                    </Link>
                                </li>
                            </ul>
                        )
                    }
                </div>


                {/* Responsive Design */}
                <div className='md:hidden flex px-4 mx-autoi sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
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
                                    <button onClick={() => {
                                        setIsMenuOpen(false);
                                        { document.getElementById('menu_btn').classList.remove('hidden') };
                                    }}>
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
