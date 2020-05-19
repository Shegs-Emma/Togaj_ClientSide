import React, { useState } from 'react';

import classes from './PhotoData.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Layout from '../Layout/Layout';

import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from 'axios';
import * as actions from '../../store/actions/index';

const PhotoData = (props) => {
    const [ dataForm, setDataForm ] = useState({
        photoData: {
            imageCategory: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'weddings', displayValue: 'Weddings'},
                        {value: 'birthdays', displayValue: 'Birthdays'},
                        {value: 'graduations', displayValue: 'Graduations'},
                        {value: 'others', displayValue: 'Others'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        }
    });

    const [ formIsValid, setFormIsValid ] = useState(false);
    const [ file, setFile ] = useState('');
    const [ fileName, setFileName ] = useState('Choose File');

//========================================================================================================
    const checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            //Use trim() to remove white spaces
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }    

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedDataForm = {
            ...dataForm.photoData
        }

        const updatedFormElement = {
            ...updatedDataForm[inputIdentifier]
        };


        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedDataForm[inputIdentifier] = updatedFormElement;
        
        
        let formIsValid = true;
        for(let formIdentifier in updatedDataForm) {
            formIsValid = updatedDataForm[formIdentifier].valid && formIsValid;
        }

        setDataForm({photoData: updatedDataForm});
        setFormIsValid(formIsValid);
    }

    const postHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('file', file);
        formData.append('imageCategory', dataForm.photoData.imageCategory.value);

        console.log(formData);

        // const formData = {};

        // for(let formElementIdentifier in dataForm.photoData) {
        //     formData[formElementIdentifier] = dataForm.photoData[formElementIdentifier].value;
        // }

        // const photo = {
        //     photoDetails: formData
        // }

        // props.onPostPhoto(photo);
        props.onPostPhoto(formData);
    };

    const onChange = (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }

    let redirect = null;

    if(props.loading){
        redirect = <Spinner />
    }

    if(props.submitted){
        redirect = <Redirect to='/gallery' />;
    }
//===================================================================================================

    const photoElementsArray = [];

    for(let key in dataForm.photoData){
        photoElementsArray.push({
            id: key,
            config: dataForm.photoData[key]
        });
    };
//====================================================================================================


    return(
        <div className={classes.Gallery}>
            <Layout uploading header='UPLOAD A PHOTOGRAPH'>
                <div className={classes.ContactData}>
                    <form onSubmit={postHandler}>
                        <div className='custom-file mb-4'>
                            <input 
                                type='file' 
                                className='custom-file-input' 
                                id='customFile'
                                onChange={onChange} />
                            <label className='custom-file-label' htmlFor='customFile'>
                                {fileName}
                            </label>
                            {photoElementsArray.map(photoElement => (
                                <Input 
                                    key={photoElement.id}
                                    elementType={photoElement.config.elementType} 
                                    elementConfig={photoElement.config.elementConfig} 
                                    value={photoElement.config.value}
                                    inValid={!photoElement.config.valid}
                                    shouldValidate={photoElement.config.validation}
                                    touched={photoElement.config.touched}
                                    changed={(event)=> inputChangedHandler(event, photoElement.id)} />
                            ))}
                        </div>
                        <Button btnType="Danger" disabled={!formIsValid}>SUBMIT</Button>
                    </form>
                </div>
            </Layout>
            {redirect}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        photos: state.photo.photos,
        loading: state.photo.loading,
        submitted: state.photo.submitted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostPhoto: (photoData) => dispatch(actions.postPhoto(photoData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PhotoData, axios));