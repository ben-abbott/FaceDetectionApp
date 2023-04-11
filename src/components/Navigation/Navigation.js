import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
        if(isSignedIn){
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline ps3 pointer'>Sign Out</p>
                </nav>
            );
        } else {
            return(<p></p>);
        }
}

export default Navigation;