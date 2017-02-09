import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import hospitals from '../hospitals/reducers/hospitalReducer';

export default combineReducers({
    flashMessages,
    auth,
    hospitals
});