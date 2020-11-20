import React, {useCallback} from 'react';
import axios, {AxiosResponse} from 'axios';
import {useHistory} from 'react-router-dom';

function Login() {
    const history = useHistory();
    const url: string = `${process.env.REACT_APP_BASE_URL}/public/login` || "";
    const getName = useCallback(async () => {
        try {
            const {data}: AxiosResponse<string> = await axios.get(url);
            history.push('/chat', data)
        } catch (error) {
            console.error(error);
        }
    }, [history, url]);

    return (
        <button onClick={getName}>Get your Name</button>
    );
}

export default Login;
