import React from 'react';
import Header from './Header';
import Footer from './Footer'; 

const Home = () => {
    return (
        <div className='home'>
            <div className='w-full'>
                <Header />
                <div className="container">
                    <div className="home-content">
                        <h1>Welcome to the Home Page</h1>
                        <p>This is the main content area.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna nec nunc facilisis varius. Donec ac ligula ut est cursus facilisis.hjzgdczjdgxcjhgzdxcbghjzcxgjgxhchxjcbvhjxcbhvjbxjbhvbxjbvjhcbfbvcjbjchbjhcjbcbjcbbc</p>
                        <p>Curabitur euismod, nunc et tincidunt cursus, nisi nisl convallis nisi, at bibendum erat ligula nec enim.</p>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Home;