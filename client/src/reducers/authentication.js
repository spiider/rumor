import { USER } from '../constants';

export default (state = { loggedIn: false, user: {} }, action) => {
  switch (action.type) {
    case USER.LOGIN_REQUEST:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case USER.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case USER.LOGIN_FAILURE:
      return {
        loggedIn: false,
        user: {} 
      };
    case USER.LOGOUT:
      return {
        loggedIn: false,
        user: {} 
      };
    default:
      return {
        ...state
      }
  }
}
