import { NEWS } from '../constants';
import { newsService } from '../services/newsService';
import { alertActions } from './';

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
