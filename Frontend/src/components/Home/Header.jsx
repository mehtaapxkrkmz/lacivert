import React from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import '../../scss/navlink.scss';

const Header = () => {
    return (
        <div className="flex justify-around items-center w-full  bg-white">
            <div className="flex justify-center items-center  bg-white">
                <div className="flex flex-row justify-between items-center gap-4">
                    <div className='header-navlinks'>

                    </div>
                </div>
            </div>
            <div className="header-logo">
                <div className='flex justify-center items-center bg-yellow-600'>
                    <img src="..\public\logo512.png" alt="Logo" className="h-10" />
                </div>
            </div>
            <nav className="header-nav">
                <div className='flex flex-raw-reverse justify-between items-center gap-8 bg-white'>
                    <div className="flex justify-center items-center header-search">
                        <input className="w-45 h-8 shrink-0 bg-white text-black text-sm" type="text" placeholder="  Arama Yap" />
                        <button type="submit" className='appearance-none bg-transparent border-none '><CiSearch className='bg-white text-black' /></button>
                    </div>
                    <div className="header-favorites">
                        <div className='flex justify-center items-center gap-2'>
                            <IoMdHeartEmpty className='text-xl text-black' />
                        </div>
                    </div>
                    <div className="header-account mt-6">
                        <div className='flex justify-center items-center gap-2'>
                            <VscAccount className='text-xl text-black' />
                            <span className="header-account-name text-black">Username</span>
                        </div>

                    </div>
                    <div className="header-basket">
                        <div className='flex justify-center items-center gap-2'>
                            <HiOutlineShoppingBag className='text-xl text-black' />
                            <span className="header-basket-count text-black">0</span>
                        </div>

                    </div>
                </div>
            </nav>
        </div>

    );
};

export default Header;


{/*
import React from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Header = () => {
    return (
        <div className='flex justify-around items-center w-full h-12 mb-6 bg-white'>
            <a href="/" className='text-3xl font-semibold'>Bıdı bıdı</a>
            <div className="header-basket relative">               
                <span className="bg-red-500 text-white text-sm w-4 h-4 flex justify-center items-center rounded-full absolute -top-2 -left-1">0</span>
                <HiOutlineShoppingBag className='text-2xl text-black' />
            </div>
        </div>
    );
}

export default Header;
*/}