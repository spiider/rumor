import { NEWS } from '../constants';

export default (state = { loading: true, list: [] }, action) => {
  switch (action.type) {
    case NEWS.SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.news
      };
    case NEWS.FAILURE:
      return {
        loggedIn: false,
        list: [], 
      };
    default:
      return {
        ...state
      }
  }
}
