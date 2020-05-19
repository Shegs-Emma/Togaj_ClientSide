import React, { useState } from 'react';

import Aux from '../../hoc/Aux';

import Photo from './Photo/Photo';
import classes from './Photos.module.css';
import Spinner from '../UI/Spinner/Spinner';

import Modal from '../UI/Modal/Modal';
import PhotoViewer from '../Photos/PhotoViewer/PhotoViewer';

const Photos = (props) => {
    const [ imageURL, setImageURL ] = useState('');
    const [ imageID, setImageId ] = useState('');

    const clicker = (url, id) => {
        setImageURL(url);
        setImageId(id);
    }

    let pictureData = props.pictures.map(picture => (
        <Photo 
            key={picture.id}
            imageUrl={picture.photoUrl} 
            category={picture.imageCategory} 
            viewer={props.view}
            click={()=>clicker(picture.photoUrl, picture.id)} />
    ));

    if(props.loading){
        pictureData = <Spinner />
    }

    return (
        <Aux>
            <div className={classes.Photos}>
                <Modal show={props.viewing} modalClosed={props.viewHandlerClosed}>
                    <PhotoViewer imageUrl={imageURL} imageID={imageID} />
                </Modal>
                <div className={classes.Photo}>
                    {pictureData}
                </div>
            </div>
        </Aux>
        
    )
}

export default Photos;