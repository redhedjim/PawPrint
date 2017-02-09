import { FETCH_HOSPITALS } from '../actions/hospitalActions';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_HOSPITALS:
      return [ action.payload.data, ...state ];
  }
  return state;  
}