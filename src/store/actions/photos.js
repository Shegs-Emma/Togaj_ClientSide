import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

export const fetchStart = () => {
    return{
        type: actionTypes.FETCH_START
    };
};

export const fetchSuccess = (photoData) => {
    return {
        type: actionTypes.FETCH_SUCCESS,
        pictures: photoData
    };
};

export const fetchFail = (error) => {
    return {
        type: actionTypes.FETCH_FAIL,
        error: error
    }
}

export const postPhotoStart = () => {
    return {
        type: actionTypes.POST_PHOTO_START
    }
}

export const postPhotoSuccess = (id, photoData) => {
    return {
        type: actionTypes.POST_PHOTO_SUCCESS,
        photoId: id,
        photoData: photoData
    };
};

export const postPhotoFail = (error) => {
    return {
        type: actionTypes.POST_PHOTO_FAIL,
        error: error
    };
};

export const postPhoto = (photoData) => {
    return dispatch => {
        dispatch(postPhotoStart());
        
        axios.post('http://localhost:3001/api/photos', photoData)
            .then(res => {
                console.log(res.data);
                dispatch(postPhotoSuccess(res.data, photoData));
            })
            .catch(error => {
                dispatch(postPhotoFail(error));
            });
    }
}

export const fetch = () => {
    return dispatch => {
        dispatch(fetchStart());

        axios.get('http://localhost:3001/api/photos')
            .then(res => {
                const fetchedData = [];
                const photos = res.data;

                photos.forEach(photo => {
                    fetchedData.push({
                        id: photo._id,
                        photoUrl: photo.photoUrl,
                        imageCategory: photo.imageCategory
                    });
                });
                dispatch(fetchSuccess(fetchedData));
            })
            .catch(err => {
                dispatch(fetchFail(err));
            })
    }
}