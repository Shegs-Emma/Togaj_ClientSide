import React from 'react';
import classes from './Logo.module.css';

import togajLogo from '../../assets/Images/togaj_logo.png';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height, width: props.width}}>
        <img src={togajLogo} alt='' />
    </div>
);

export default logo;