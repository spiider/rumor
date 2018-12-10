import { USER } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case USER.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case USER.LOGIN_FAILURE:
      return {};
    case USER.LOGOUT:
      return {};
    default:
      return state
  }
}
