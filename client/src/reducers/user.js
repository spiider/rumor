import { USER } from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case USER.REGISTER_REQUEST:
      return {
      };
    case USER.REGISTER_SUCCESS:
      return {
      };
    case USER.REGISTER_FAILURE:
      return { 
        message: 'Can not create a account at this moment',
        error: action.error
      };
    default:
      return state
  }
}
