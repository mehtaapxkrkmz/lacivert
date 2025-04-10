import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Template = () => {
    return (
        <div className='min-h-screen flex flex-col w-full'>
            <Header />
            <main className="flex-grow p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Template;