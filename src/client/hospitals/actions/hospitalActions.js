import axios from 'axios';

const GET_HOSPITALS = 'GET_HOSPITALS';
const SET_ACTIVE_HOSPITAL = 'SET_ACTIVE_HOSPITAL';

/* This gets the list of hospitals from the server and sets the Redux state "hospitals" to the result */
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

/* This Sets the active hospital to the hospital clicked */
export function setActiveHospital(active_hospital) {  
  return function(dispatch){
    dispatch(activeHospital(active_hospital[0]))
  }
}



/* This is pulled out of setActive hospital to set initail hospital state to */
function activeHospital(hospital) {
  return {
    type: SET_ACTIVE_HOSPITAL,
    active_hospital: hospital
  }
}