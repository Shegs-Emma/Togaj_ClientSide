import React from 'react';

import Aux from '../../../hoc/Aux';
import classes from './PhotoViewer.module.css';

const photoViewer = (props) => {

    return (
        <Aux>
            <img src={props.imageUrl} alt='' className={classes.PhotoViewer} />
            {/*Add the EDIT and DELETE Buttons at the end of the development*/}
            {/* <button>EDIT</button>
            <button>DELETE</button> */}
        </Aux>
    );
};

export default photoViewer;