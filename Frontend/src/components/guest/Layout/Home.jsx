import React from 'react';
import home_content_1 from '../../../assets/home_content_1.png';
import home_content_2 from '../../../assets/home_content_2.png';
import home_content_3 from '../../../assets/home_content_3.png';
import Products from './Products';
// import Favori from '../../guest/Favori';
import '../../../scss/index.scss';

function Home() {
  return (    
    <div className='home'>
      <div className='home-content'>
        <img src={home_content_1} alt="home_content_1" />
        <img src={home_content_2} alt="home_content_2" />
        <img src={home_content_3} alt="home_content_3" />
      </div>  

      <Products/>

      
    </div>
    
  );
}
  
export default Home;
