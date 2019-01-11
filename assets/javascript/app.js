$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD2Q0y8Af5t1CJBRMkPjrK_77K2mO3-lKQ",
    authDomain: "homework-d4bd0.firebaseapp.com",
    databaseURL: "https://homework-d4bd0.firebaseio.com",
    projectId: "homework-d4bd0",
    storageBucket: "homework-d4bd0.appspot.com",
    messagingSenderId: "129588226247"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Store values submitted from form
  $("#submit-btn").on("click", function(event) {
    event.preventDefault();

    var trainData = {
      trainName: $("#name-input").val().trim(),
      destination: $("#destination-input").val().trim(),
      firstArrival: $("#first-arrival-input").val(),
      frequency: parseInt($("#frequency-input").val())
    };

    // add train data to firebase
    database.ref("Train Information").push(trainData);
  
    // Clear input fields after data is submitted
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-arrival-input").val("");
    $("#frequency-input").val("");

    //convert first train arrival into hours and minutes (1 year subtracted so that train arrives in "future") 
    trainData.firstArrival = moment(trainData.firstArrival, "HH:mm").subtract(1, "years")
  });

  // add child added listener everytime new information is entered
  database.ref("Train Information").on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstArrival = childSnapshot.val().firstArrival;
    var frequency = childSnapshot.val().frequency;

    //calculate next train arrival time and minutes until train arrives
    firstArrivalFormatted = moment(firstArrival, "X").format("MM/DD/YYYY");

    timeDifferance = moment().diff(moment(firstArrivalFormatted), "minutes");

    timeAway = timeDifferance % frequency;

    minUntilArrival = frequency - timeAway;

    nextTrainArrival = moment().add(minUntilArrival, "minutes")

    nextTrainArrivalConv = moment(nextTrainArrival).format("HH:mm")

    // create a table row for train information
    var $tr = $("<tr>");
    $tr
      .append(`<td>${trainName}</td>`)
      .append(`<td>${destination}</td>`)
      .append(`<td>${frequency}</td>`)
      .append(`<td>${nextTrainArrivalConv}</td>`)
      .append(`<td>${minUntilArrival}</td>`)

      //add train information to table
      $("tbody#train-info").append($tr)
  });
  
  // Unfinished timer to update minutes until arrived

  // Create function to update time until arrival
  // function updateTime () {
  //   database.ref("Train Information").once("value", function(snapshot) {
  //     snapshot.forEach(function(childSnapshot) {
  //       // you now have access to each train one at a time
  //       var firstArrival = childSnapshot.val().firstArrival;
  //       var frequency = childSnapshot.val().frequency;

  //       firstArrival = moment(firstArrival, "HH:mm").subtract(1, "years")
    
  //       firstArrivalFormatted = moment(firstArrival, "X").format("MM/DD/YYYY");
    
  //       timeDifferance = moment().diff(moment(firstArrivalFormatted), "minutes");
    
  //       timeAway = timeDifferance % frequency;
    
  //       minUntilArrival = frequency - timeAway;
  //       console.log(`minutes until arrival = ${minUntilArrival}`)
    
  //       nextTrainArrival = moment().add(minUntilArrival, "minutes")
  //       console.log(`next train arrival = ${nextTrainArrival}`)
        
  //     // If statement when minutes until arrival = frequency, minutes changes to "arrived"
  //   if (minUntilArrival === frequency) {

  //     database.ref("Train Information").on("child_changed", function(childSnapshot) {
      
  //     minUntilArrival = "Arrived"

  //     });

  //     // Runs the departure function after 30 seconds, changing "arrived" to "departing soon"
  //     intervalId = setInterval(departure, (30*1000));

  //       };
  //     });
  //   });
  // };
  
  // // Updates minutes until arrival every minute
  // intervalId = setInterval(updateTime, (60 * 1000));

  // function departure() {
  //   database.ref("Train Information").on("child_changed", function(childSnapshot){
  //     minUntilArrival = "Departing soon";
  //   });
  // };
});