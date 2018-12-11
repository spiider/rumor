import { NEWS } from '../constants';

export default (state = { loading: true, list: [], news: {}, comments: [] }, action) => {
  switch (action.type) {
    case NEWS.SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.news
      };
    case NEWS.COMMENT_SUCCES:
      return {
        ...state,
        comments: action.comments
      };
    case NEWS.NEWS_SUCCESS:
      return {
        ...state,
        news: action.oneNews
      };
    case NEWS.FAILURE:
      return {
        loggedIn: false,
        list: [], 
      };
    case NEWS.EDIT_FAILURE:
      return {
        message: 'something went wrong',
      }
    default:
      return {
        ...state
      }
  }
}
