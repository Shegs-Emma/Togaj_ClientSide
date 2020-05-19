import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

import Photos from '../../components/Photos/Photos';
import Layout from '../Layout/Layout';
import classes from './Gallery.module.css';
import * as actions from '../../store/actions/index';

const Gallery = (props) => {
    const [ viewing, setViewing ] = useState(false);
    const { pictures, loading, onFetch } = props;

    useEffect(() => {
        onFetch();
    }, [onFetch]);
    
    const viewHandler = () => {
        setViewing(true);
    }

    const viewHandlerClosed = () => {
        setViewing(false);
    }

    let photograph = <Spinner />

    if(pictures){
        photograph = (
            <Photos 
                pictures={props.pictures} 
                view={viewHandler} 
                loading={loading}
                viewing={viewing}
                viewHandlerClosed={viewHandlerClosed} />
        )
    }


    return (
        <div className={classes.Gallery}>
            <Layout>
                <div className={classes.PhotoDiv}>
                    {photograph}
                </div>
            </Layout>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        pictures: state.photo.pictures,
        loading: state.photo.loading
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetch: () => (dispatch(actions.fetch()))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);