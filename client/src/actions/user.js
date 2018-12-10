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
                    dispatch(push('/'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: USER.REQUEST, user } }
    function success(user) { return { type: USER.SUCCESS, user } }
    function failure(error) { return { type: USER.FAILURE, error } }
}

export const logout = () => {
    return { type: USER.LOGOUT };
}
