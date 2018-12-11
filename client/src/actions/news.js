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

export const getDrafts = (token) => {
    return dispatch => {
        dispatch(request());

        newsService.getDrafts(token)
            .then(
                drafts => { 
                    dispatch(success(drafts));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: NEWS.DRAFT_REQUEST, } }
    function success(drafts) { return { type: NEWS.DRAFT_SUCCESS, drafts } }
    function failure(error) { return { type: NEWS.DRAFT_FAILURE, error } }
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

export const addComment = (token, comment, id) => {
    return dispatch => {
        dispatch(request());

        newsService.addComment(token, comment, id)
            .then(() => { 
                    dispatch(success());
                    window.location.reload(); 
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: NEWS.COMMENT_ADD_REQUEST, } }
    function success() { return { type: NEWS.COMMENT_ADD_SUCCESS, } }
    function failure(error) { return { type: NEWS.COMMENT_ADD_FAILURE, error } }
}

export const getNews = (token, id) => {
    return dispatch => {
        dispatch(request());

        newsService.getNews(token, id)
            .then((oneNews) => { 
                    dispatch(success(oneNews));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: NEWS.NEWS_REQUEST, } }
    function success(oneNews) { return { type: NEWS.NEWS_SUCCESS, oneNews} }
    function failure(error) { return { type: NEWS.NEWS_FAILURE, error } }
}

export const getComments = (id) => {
    return dispatch => {
        dispatch(request());

        newsService.getComments(id)
            .then((comments) => { 
                    dispatch(success(comments));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: NEWS.COMMENT_REQUEST, } }
    function success(comments) { return { type: NEWS.COMMENT_SUCCESS, comments} }
    function failure(error) { return { type: NEWS.COMMENT_FAILURE, error } }
}
