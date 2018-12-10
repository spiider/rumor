import { combineReducers } from 'redux'
import user from './user'
import authentication from './authentication'
import news from './news';


export default combineReducers({
  authentication,
  user,
  news,
});
