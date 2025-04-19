import React from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <div className='items'>
                <div className='categories'>
                    <NavLink to="/admin">ADMİN</NavLink>
                    <NavLink to="/kadin">KADIN</NavLink>
                    <NavLink to="/erkek">ERKEK</NavLink>
                    <NavLink to="/cocuk">ÇOCUK</NavLink>
                    {/*<NavLink to="/admin">JEAN</NavLink>
                    <NavLink to="/admin">OUTLET</NavLink>*/}                   
                </div>
                <div className='logo'>
                    <NavLink to="/">
                        <img src="../../../../public/images/lacivert-logo.png" alt="Logo"/>
                    </NavLink>                 
                </div>
                <div className='navbar'>
                    <div className='items'>
                        <div className="search">
                            <NavLink to="/admin">
                                <input type="text" placeholder="   Arama Yap" />
                            </NavLink>
                            <NavLink to="/admin">
                                <button type="submit"><CiSearch /></button>
                            </NavLink>
                        </div>
                        <NavLink to="/admin">
                            <div className="favorites">
                                <IoMdHeartEmpty />
                            </div>
                        </NavLink>
                        <NavLink to="/profileupdate">
                            <div className="account">
                                <VscAccount className="VscAccount" />
                            </div>
                        </NavLink>
                        <NavLink to="/login">
                            <div className="login">
                                <CiLogin className="CiLogin" />
                            </div>
                        </NavLink>
                        <NavLink to="/admin">
                            <div className="shopping-bag">
                                <HiOutlineShoppingBag />
                                <span className="count">0</span>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;