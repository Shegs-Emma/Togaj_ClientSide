import React from 'react';

import Button from '../../components/UI/Button/Button';
import logo from '../../assets/togaj-logo.jpg';
import './Landing.css';

const Landing = () => {
    return(
        <div className="Landing" > 
            <div className="welcome-text">
                Welcome To Togaj Photography
            </div>
            <div>
                 <img src={logo} className="Landing-logo" alt="logo" /> 
            </div>
            <a href="/gallery" ><Button btnType="Danger"> Gallery </Button></a>
        </div>
    )
}

export default Landing;