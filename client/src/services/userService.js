import { handleResponse } from './helper';
import { URL } from '../constants';

export const userService = {
    login,
    register,
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${URL}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            return user;
        });
}

function register(email, password, firstName, lastName) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName })
    };

    return fetch(`${URL}/user`, requestOptions)
        .then(handleResponse)
        .then(user => user);
}
