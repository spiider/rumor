import { USER } from '../constants';

export default (state = { loggedIn: false, message: '', user: { token: '' } }, action) => {
  switch (action.type) {
    case USER.REQUEST:
      return {
        ...state,
        loggedIn: false,
        message: '',
        user: action.user
      };
    case USER.SUCCESS:
      return {
        ...state,
        loggedIn: true,
        message: '',
        user: action.user
      };
    case USER.FAILURE:
      return {
        loggedIn: false,
        message: 'Ops... Login fail.',
        user: {} 
      };
    case USER.LOGOUT:
      return {
        loggedIn: false,
        message: '',
        user: {
          token: '',
        } 
      };
    default:
      return {
        ...state
      }
  }
}
