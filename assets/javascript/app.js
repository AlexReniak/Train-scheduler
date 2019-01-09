document.ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD2Q0y8Af5t1CJBRMkPjrK_77K2mO3-lKQ",
    authDomain: "homework-d4bd0.firebaseapp.com",
    databaseURL: "https://homework-d4bd0.firebaseio.com",
    projectId: "homework-d4bd0",
    storageBucket: "",
    messagingSenderId: "129588226247"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit-btn").on("click", function(event) {
    event.preventDefault();

    var trainData = {
      trainName: $("#name-input").val().trim(),
      destination: $("#desination-input").val().trim(),
      timeArrival: $("#time-input").val(),
      frequency:$("#frequency-input").val()
    };

    console.log(trainData);

    database.ref().push(trainData);
})