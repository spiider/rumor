import { push } from 'connected-react-router'
import { USER } from '../constants';
import { userService } from '../services/userService';
import { alertActions } from './';

export const login = (email, password) => {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: USER.LOGIN_REQUEST, user } }
    function success(user) { return { type: USER.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: USER.LOGIN_FAILURE, error } }
}

export const logout = () => {
    userService.logout();
    return { type: USER.LOGOUT };
}

export const getAll = () => {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: USER.GETALL_REQUEST } }
    function success(users) { return { type: USER.GETALL_SUCCESS, users } }
    function failure(error) { return { type: USER.GETALL_FAILURE, error } }
}
