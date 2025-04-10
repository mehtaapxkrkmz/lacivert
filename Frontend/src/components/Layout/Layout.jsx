import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import '../../scss/Layout.scss';

const Layout = () => {
    return (
        <div className='layout'>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;