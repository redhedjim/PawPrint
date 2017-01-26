import { combineReducers } from 'redux';
import flashMessages from './reducers/FlashMessages';
import auth from './reducers/auth';

export default combineReducers({
    flashMessages,
    auth
});