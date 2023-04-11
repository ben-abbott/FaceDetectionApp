import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className='ma4 mt0 '>
            <Tilt className='br2 shadow-2 Tilt'>
                <img alt='Logo' src={brain}></img>
            </Tilt>
        </div>
    )
}

export default Logo;

// style={{ height: '300px', width: '300px' }}