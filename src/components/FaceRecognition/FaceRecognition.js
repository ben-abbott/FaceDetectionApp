import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ( { imageUrl }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2 img-container'>
                <img alt='' src={imageUrl} width='250px' height='auto' onerror="this.style.display='none'" />
            </div>
        </div>
    )
}

export default FaceRecognition;