import React from 'react';

const Header = () => {
    return (
        <div className="flex justify-between items-center w-full bg-amber-100 px-4 gap-20">
            <div className="header-categories">
                <div className="flex flex-row justify-between items-center gap-4">
                    <a className="flex justify-center items-center p-2 bg-amber-200 text-black" href="/">ADMİN</a>
                    <a className="flex justify-center items-center p-2 bg-amber-200 text-black" href="/">TEST</a>
                    <a className="flex justify-center items-center p-2 bg-amber-200 text-black" href="/">JEAN</a>
                    <a className="flex justify-center items-center p-2 bg-amber-200 text-black" href="/">KADIN</a>
                    <a className="flex justify-center items-center p-2 bg-amber-200 text-black" href="/">ERKEK</a>
                    <a className="flex justify-center items-center p-2 bg-amber-200 text-black" href="/">ÇOCUK</a>
                    <a className="flex justify-center items-center p-2 bg-amber-200 text-black" href="/">OUTLET</a>
                </div>
            </div>
            <div className="header-logo">
                <div className='flex justify-center items-center bg-yellow-600'>
                    <img src="..\public\logo512.png" alt="Logo" className="h-10" />
                </div>
            </div>
            <nav className="header-nav">
                <div className='flex flex-raw-reverse justify-between items-center gap-1 bg-green-200'>
                    <div className="header-search">
                        <input className="rounded-2xl bg-amber-950" type="text" placeholder="  Search..." />
                        <button type="submit">Search</button>
                    </div>
                    <div className="header-favorites">
                        <img src="/path/to/favorites-icon.png" alt="Favorites Icon" />
                        <span className="header-favorites-count">0</span>
                    </div>
                    <div className="header-account">
                        <img src="/path/to/account-icon.png" alt="Account Icon" />
                        <span className="header-account-name">Username</span>
                    </div>
                    <div className="header-basket">
                        <img src="/path/to/basket-icon.png" alt="Basket Icon" />
                        <span className="header-basket-count">0</span>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;