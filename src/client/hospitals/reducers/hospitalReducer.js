import { GET_HOSPITALS, SET_ACTIVE_HOSPITAL } from '../actions/hospitalActions';

export function getHospitals(state = [], action) {
  switch (action.type) {
    case 'GET_HOSPITALS':
      return [ action.hospitals, ...state ]
    default:
      return state;
  }
}

export function setActiveHospital(state = {}, action) {
  switch (action.type) {
    case 'SET_ACTIVE_HOSPITAL':    
      return action.active_hospital
    default:
      return state;
  }
};