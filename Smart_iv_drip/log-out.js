
// already firebase config was need to put
  const signOut = document.getElementById('logout');

signOut.addEventListener("click", function() {
  firebase.auth().signOut().then(function() {
    window.location.href = '/index.html';
    message.innerHTML = "Signout successful";
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
});
