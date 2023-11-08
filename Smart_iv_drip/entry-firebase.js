const firebaseConfig = {
  apiKey: "AIzaSyBgj_jKGcI9EAhoEDcjTZp_Spng4VVpSTc",
  authDomain: "fir-config1.firebaseapp.com",
  databaseURL: "https://fir-config1-default-rtdb.firebaseio.com",
  projectId: "fir-config1",
  storageBucket: "fir-config1.appspot.com",
  messagingSenderId: "543248063856",
  appId: "1:543248063856:web:7d60fdf6080d0f778103b5",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const div = document.getElementById("show");

db.ref().on("value", function (snapshot) {
  div.innerHTML = "";
  snapshot.forEach(function (roomSnapshot) {
    var roomNumber = roomSnapshot.key;

    roomSnapshot.forEach(function (bedSnapshot) {
      var bedNumber = bedSnapshot.key;

      var divPat = document.createElement("div");
      divPat.classList.add("patBox");
      divPat.classList.add("row");
      div.appendChild(divPat);

      var divPatCol1 = document.createElement("div");
      var divPatCol2 = document.createElement("div");

      divPat.appendChild(divPatCol1);
      divPat.appendChild(divPatCol2);

      divPatCol1.classList.add("col");

      divPatCol2.classList.add("col-md-2");
      divPatCol2.classList.add("dripClass");

      var divPatCol1Row1 = document.createElement("div");
      divPatCol1Row1.classList.add("row");
      divPatCol1Row1.classList.add("flex");
      var divPatCol1Row1Col1 = document.createElement("div");
      var divPatCol1Row1Col2 = document.createElement("div");
      var divPatCol1Row1Col3 = document.createElement("div");
      divPatCol1Row1Col1.classList.add("col-3");
      divPatCol1Row1Col2.classList.add("col-5");
      divPatCol1Row1Col3.classList.add("col");

      divPatCol1.appendChild(divPatCol1Row1);

      divPatCol1Row1.appendChild(divPatCol1Row1Col1);
      divPatCol1Row1.appendChild(divPatCol1Row1Col2);
      divPatCol1Row1.appendChild(divPatCol1Row1Col3);

      // Access values within the bedSnapshot
      var patID = bedSnapshot.child("patientID").val() || "N/A";
      divPatCol1Row1Col1.innerHTML = "<b>PATIENT ID : #</b>" + patID;

      var name = bedSnapshot.child("patientName").val() || "N/A";
      divPatCol1Row1Col2.innerHTML = "<b>PATIENT NAME : </b>" + name;

      var age = bedSnapshot.child("patientAge").val() || "N/A";
      divPatCol1Row1Col3.innerHTML = "<b>PATIENT AGE : </b>" + age;


      var divPatCol1Row3 = document.createElement("div");
      divPatCol1Row3.classList.add("row");
      divPatCol1Row3.classList.add("flex");
      var divPatCol1Row3Col1 = document.createElement("div");
      var divPatCol1Row3Col2 = document.createElement("div");
      divPatCol1.appendChild(divPatCol1Row3);

      divPatCol1Row3.appendChild(divPatCol1Row3Col1);
      divPatCol1Row3.appendChild(divPatCol1Row3Col2);
      divPatCol1Row3Col1.classList.add("col");
      divPatCol1Row3Col2.classList.add("col");

      var disease = bedSnapshot.child("patientSymptoms").val() || "N/A";
      divPatCol1Row3Col1.innerHTML = "<b>PATIENT SYMPTOMS : </b>" + disease;

      var bloodGroup = bedSnapshot.child("patientBloodGroup").val() || "N/A";
      divPatCol1Row3Col2.innerHTML = "<b>PATIENT BLOOD GROUP : </b>" + bloodGroup;

      var divPatCol1Row2 = document.createElement("div");
      divPatCol1Row2.classList.add("row");
      divPatCol1Row2.classList.add("flex");
      var divPatCol1Row2Col1 = document.createElement("div");
      var divPatCol1Row2Col2 = document.createElement("div");
      var divPatCol1Row2Col3 = document.createElement("div");
      divPatCol1.appendChild(divPatCol1Row2);

      divPatCol1Row2.appendChild(divPatCol1Row2Col1);
      divPatCol1Row2.appendChild(divPatCol1Row2Col2);
      divPatCol1Row2.appendChild(divPatCol1Row2Col3);
      divPatCol1Row2Col1.classList.add("col-3");
      divPatCol1Row2Col2.classList.add("col-3");
      divPatCol1Row2Col3.classList.add("col");

      var ivFluid = bedSnapshot.child("patientIVFluid").val() || "N/A";
      divPatCol1Row2Col3.innerHTML = "<b>PATIENT IV FLUID : </b>" + ivFluid;

      divPatCol1Row2Col1.innerHTML = "<b>ROOM NUMBER : </b>" + roomNumber;

      divPatCol1Row2Col2.innerHTML = "<b>BED NUMBER : </b>" + bedNumber;

      var dripStatus = bedSnapshot.child("dripStatus").val();
      if (dripStatus === false) {
        divPatCol2.innerHTML =
          '<img class="dripImage" src="green.png">';
      } else {
        divPatCol2.innerHTML =
          '<img class="dripImage" src="red.png">';
      }
    });
  });
});
