import axios from 'axios';

const GET_HOSPITALS = 'GET_HOSPITALS';
const SET_ACTIVE_HOSPITAL = 'SET_ACTIVE_HOSPITAL';

export function fetchHospitals(params) { 
  let mystuff;
  return function(dispatch) {
    new Promise((resolve, reject) => {
      axios.get('/api/hospitals', params)
        .then((results) => {
          mystuff = results.data.data;
          resolve(results.data.data)
        }).then(() => {
          dispatch(getHospitals(mystuff))
          console.log("in action", mystuff[0]);
          
          dispatch(activeHospital(mystuff[0]))
        });  
    })
  }
	function getHospitals(hospitals) {           
			return {
					type: GET_HOSPITALS,
					hospitals
			};
	};
}

export function setActiveHospital(active_hospital) {  
  return function(dispatch){
    dispatch(activeHospital(active_hospital[0]))
  }
}
function activeHospital(hospital) {
  return {
    type: SET_ACTIVE_HOSPITAL,
    active_hospital: hospital
  }
}