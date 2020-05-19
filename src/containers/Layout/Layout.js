import React, { useState } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import logo from '../../assets/togaj_logo.png';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [ showSideDrawer, SetShowSideDrawer ] = useState(false);

    const sideDrawerClosedHandler = () => {
        SetShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        SetShowSideDrawer(!showSideDrawer);
    }

    let header2 = (
        <header className={classes.header2}>
            <span>Weddings</span> <span>Birthdays</span> <span>Graduations</span> <span>Others</span>
        </header>
    );

    if(props.uploading){
        header2 = <header className={classes.header2}>
                    <h4>{props.header}</h4>
                </header>;
    }

    return(
        <Aux>
            <Toolbar img={logo} drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
            {header2}

            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default Layout;