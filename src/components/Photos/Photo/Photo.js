import React from 'react';
import classes from './Photo.module.css';

const Photo = (props) => {
    const handleClick = () => {
        props.viewer();
        props.click();
    }

    return(
        <div className={classes.Photo}>

            <img 
                src={props.imageUrl} 
                alt=""
                className={classes.Image} />
            {/* {props.category} */}
            <button onClick={handleClick}> View Photo </button>
    
        </div>
    )
}

export default Photo;