const firebaseConfig = {
  apiKey: "AIzaSyBgj_jKGcI9EAhoEDcjTZp_Spng4VVpSTc",
  authDomain: "fir-config1.firebaseapp.com",
  databaseURL: "https://fir-config1-default-rtdb.firebaseio.com",
  projectId: "fir-config1",
  storageBucket: "fir-config1.appspot.com",
  messagingSenderId: "543248063856",
  appId: "1:543248063856:web:7d60fdf6080d0f778103b5"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const statDiv = document.getElementById('status');
const form = document.getElementById('addPatientForm');
//dbRefObject.on('value', snap => console.log(snap.val()));

const submit = document.getElementById('submit');

submit.addEventListener("click", function(){
  var patID = Date.now() % Math.pow(10,7);
  const name = document.getElementById('inputName').value;
  const age = document.getElementById('inputAge').value;
  // const disease = document.getElementById('inputDisease').value;
  const bloodGroup = document.getElementById('inputBloodGroup').value;
  const gender = document.getElementById('inputGender').value;
  const doctor = document.getElementById('inputDoctorName').value;
  const mobile = document.getElementById('inputNumber').value;
  const room = document.getElementById('inputRoomNumber').value;
  const bed = document.getElementById('inputBedNumber').value;
  const emergencyNumber = document.getElementById('inputEmergencyNumber').value;
  const address = document.getElementById('inputAddress').value;
  const medHistory = document.getElementById('inputMedHistory').value;
  const symptoms = document.getElementById('inputSymptoms').value;
  const insurance = document.getElementById('inputInsurance').value;
  const healthScheme = document.getElementById('inputHealthScheme').value;
  form.reset();

  db.ref(patID).set({
    patientName: name,
    patientAge: age,
    // patientDisease: disease,
    patientBloodGroup: bloodGroup,
    patientGender: gender,
    consultingDoctor: doctor,
    patientMobile: mobile,
    roomNumber: room,
    bedNumber: bed,
    patientEmergencyNumber: emergencyNumber,
    patientAddress: address,
    prevMedicalHistory: medHistory,
    patientSymptoms: symptoms,
    patientInsurance: insurance,
    patientHealthScheme: healthScheme
}).then(function() {
      statDiv.style.color="rgb(0,115,255)"
      statDiv.style.visibility = "visible";
      statDiv.innerText = "SUCCESFULLY ADDED! PATIENT ID : " + patID ;
  }).catch(function(error) {
      var errorMessage = error.message;
      statDiv.style.color='rgb(255,0,0)';
      statDiv.innerText = "ERROR: " + errorMessage.toUpperCase();
  });;

});