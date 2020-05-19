import { useState, useEffect } from 'react';

export default HttpClient => {
    
    const [ error, setError ] = useState(null);

        
    const reqInterceptor = HttpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    })
    const resInterceptor = HttpClient.interceptors.response.use(res => res, err => {
        setError(err);
        
    })

    useEffect(() => {
        //Runs the above when it mounts
        //Runs the below when it unmounts
        return () => {
            HttpClient.interceptors.request.eject(reqInterceptor);
            HttpClient.interceptors.response.eject(resInterceptor);
        };
    }, [HttpClient.interceptors.request, HttpClient.interceptors.response, reqInterceptor, resInterceptor]);


    const errorConfirmedhandler = () => {
        setError(null);
    }

    return [error, errorConfirmedhandler];
}