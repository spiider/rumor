import { NEWS } from '../constants';
import { newsService } from '../services/newsService';
import { alertActions } from './';
import { push } from 'connected-react-router';

export const listNews = (token) => {
    return dispatch => {
        dispatch(request());

        newsService.listNews(token)
            .then(
                news => { 
                    dispatch(success(news));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: NEWS.REQUEST, } }
    function success(news) { return { type: NEWS.SUCCESS, news } }
    function failure(error) { return { type: NEWS.FAILURE, error } }
}

export const editNews = (token, title, content, id, status) => {
    return dispatch => {
        dispatch(request());

        newsService.editNews(token, title, content, id, status)
            .then(() => { 
                    dispatch(success());
                    dispatch(push('/'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: NEWS.EDIT_REQUEST, } }
    function success() { return { type: NEWS.EDIT_SUCCESS, } }
    function failure(error) { return { type: NEWS.EDIT_FAILURE, error } }
}
