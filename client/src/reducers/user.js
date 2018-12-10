import { USER } from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case USER.GETALL_REQUEST:
      return {
        loading: true
      };
    case USER.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case USER.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}
