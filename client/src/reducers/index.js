import { combineReducers } from 'redux'
import user from './user'
import authentication from './authentication'


export default combineReducers({
  authentication,
  user,
});
