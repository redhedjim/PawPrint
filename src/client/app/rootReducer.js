import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import { getHospitals, setActiveHospital } from '../hospitals/reducers/hospitalReducer';

export default combineReducers({
    flashMessages,
    auth,
    hospitals: getHospitals,
    active_hospital: setActiveHospital
});