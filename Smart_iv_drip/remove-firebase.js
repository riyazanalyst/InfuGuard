// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgj_jKGcI9EAhoEDcjTZp_Spng4VVpSTc",
  authDomain: "fir-config1.firebaseapp.com",
  databaseURL: "https://fir-config1-default-rtdb.firebaseio.com",
  projectId: "fir-config1",
  storageBucket: "fir-config1.appspot.com",
  messagingSenderId: "543248063856",
  appId: "1:543248063856:web:7d60fdf6080d0f778103b5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db1 = firebase.database();

const checkBtn = document.getElementById('check');
const dischargeBtn = document.getElementById('discharge');
const message = document.getElementById('message');
const form = document.getElementById('patIdForm');
const patDiv = document.getElementById('pat');
var patientFound = 0;
var dripFound = 0;

document.getElementById('inputPatientID').addEventListener('keypress', function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
  }
});

const patientName = document.getElementById('name');
const patientAge = document.getElementById('age');
const patientBloodGroup = document.getElementById('bloodGroup');
const patientMobile = document.getElementById('mobile');
const patientGender = document.getElementById('gender');
const consultingDoctor = document.getElementById('doctor');
const patientAddress = document.getElementById('address');
const roomNumber = document.getElementById('roomNumber');
const bedNumber = document.getElementById('bedNumber');

class Patient {
  constructor(id, name, age, bloodGroup, mobile, gender, doctor, address, roomNumber, bedNumber, emergencyNumber, healthScheme, insurance, medHistory, symptoms) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.bloodGroup = bloodGroup;
    this.mobile = mobile;
    this.gender = gender;
    this.doctor = doctor;
    this.address = address;
    this.roomNumber = roomNumber;
    this.bedNumber = bedNumber;
    this.emergencyNumber = emergencyNumber;
    this.healthScheme = healthScheme;
    this.insurance = insurance;
    this.medHistory = medHistory;
    this.symptoms = symptoms;
  }
}

let patient = new Patient();

checkBtn.addEventListener("click", function(){
  pat.style.visibility="hidden";
  message.style.visibility = "hidden";
  dischargeBtn.style.visibility = "hidden";
  const patientID = document.getElementById('inputPatientID').value;
  db1.ref().once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      if(childSnapshot.key == patientID) {
        patientFound = 1;
        patient = new Patient(patientID,
          childSnapshot.child("patientName").val().toUpperCase(),
          childSnapshot.child("patientAge").val(),
          childSnapshot.child("patientBloodGroup").val().toUpperCase(),
          childSnapshot.child("patientMobile").val(),
          childSnapshot.child("patientGender").val().toUpperCase(),
          childSnapshot.child("consultingDoctor").val().toUpperCase(),
          childSnapshot.child("patientAddress").val().toUpperCase(),
          childSnapshot.child("roomNumber").val(),
          childSnapshot.child("bedNumber").val(),
          childSnapshot.child("patientEmergencyNumber").val(),
          childSnapshot.child("patientHealthScheme").val().toUpperCase(),
          childSnapshot.child("patientInsurance").val().toUpperCase(),
          childSnapshot.child("prevMedicalHistory").val().toUpperCase(),
          childSnapshot.child("patientSymptoms").val().toUpperCase(),
        );
      }
    });
    if(patientFound == 0) {
      form.reset();
      message.innerHTML = "ERROR: NO PATIENT WITH PATIENT ID - " + patientID + " FOUND!";
      message.style.visibility = "visible";
      message.style.color = "rgb(255, 0, 0)";
    }
    else {
      form.reset();
      patientName.innerHTML = "<b>PATIENT NAME : </b>" + patient.name;
      patientAge.innerHTML = "<b>PATIENT AGE : </b>" + patient.age;
      patientBloodGroup.innerHTML = "<b>PATIENT BLOOD GROUP : </b>" + patient.bloodGroup;
      patientMobile.innerHTML = "<b>PATIENT MOBILE : </b>" + patient.mobile;
      patientGender.innerHTML = "<b>PATIENT GENDER : </b>" + patient.gender;
      consultingDoctor.innerHTML = "<b>CONSULTING DOCTOR : </b>" + patient.doctor;
      patientAddress.innerHTML = "<b>PATIENT ADDRESS : </b>" + patient.address;
      roomNumber.innerHTML = "<b>ROOM NUMBER: </b>" + patient.roomNumber;
      bedNumber.innerHTML = "<b>BED NUMBER : </b>" + patient.bedNumber;
      pat.style.visibility="visible";
      dischargeBtn.style.visibility = 'visible';
    }
  });
});

dischargeBtn.addEventListener("click", function(){
  removePatient();
});

function removePatient() {
  const patID = document.getElementById('inputPatientID').value;

  // Check if patientID is valid and non-empty
  if (!patID) {
    console.error("Invalid patient ID");
    return;
  }

  // Create a reference to the patient's data
  const patientRef = db1.ref(patID);

  // Remove the patient's data
  patientRef.remove()
    .then(() => {
      message.innerHTML = "SUCCESS: PATIENT IS DISCHARGED AND DATA IS REMOVED";
      message.style.color = "rgb(0, 115, 255)";
      message.style.visibility = "visible";
    })
    .catch(error => {
      console.error("Error removing patient: ", error);
      message.innerHTML = "ERROR: Failed to remove patient data";
      message.style.color = "rgb(255, 0, 0)";
      message.style.visibility = "visible";
    });
}
