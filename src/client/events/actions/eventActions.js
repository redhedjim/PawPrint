import axios from 'axios';

export function createEvent(event) {
    axios.post('/api/events', event).then((results) => {
        return dispatch => {
            return results
        };           
    });
}