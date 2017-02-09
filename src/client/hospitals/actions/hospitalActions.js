import axios from 'axios';

const GET_HOSPITALS = 'GET_HOSPITALS';

export function fetchHospitals(params) { 
  return function(dispatch) {
    new Promise((resolve, reject) => {
      axios.get('/api/hospitals', params)
        .then((results) => {
						//modified this as it was passing undeifned to getHospitals
            resolve(results);
            dispatch(getHospitals(results))
        })
    })
	}

	function getHospitals(hospitals) {   
			return {
					type: GET_HOSPITALS,
					hospitals
			};
	};
}