import axios from 'axios';

export function fetchHospitals(params) { 
    new Promise((resolve, reject) => {
        axios.get('/api/hospitals', params).then((results) =>{
            resolve(results);
        })
    }).then((hospitals) =>{
        return dispatch => {
            return hospitals;
        };

    })   
}