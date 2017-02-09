import {GET_HOSPITALS} from '../actions/hospitalActions';

export default (state = null, action) => {
  console.log('Actionsssss: ', action.type);
  switch (action.type) {
    case 'GET_HOSPITALS':
      return action.hospitals;
    default:
      return state;
  }
};