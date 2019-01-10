/* $(document).on("load", function() {
  $("#signin-modal").css("display", "block")
  $("#main-info-panel").css("display", "none");
});  */

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

    //convert first train arrival into hours and minutes (1 year subtracted such that its before current time) 
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

/*   var auth = firebase.auth()

  function toggleSignIn() {
    if (auth.currentUser) {
      
      auth.signOut();
      
    } else {
      var email = $("#email-input")('email').value;
      var password = $("#password-input")('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      
  auth.signInWithEmailAndPassword(email, password).catch(function(error) {
    
    var errorCode = error.code;
    var errorMessage = error.message;
    
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    //$('#QUICKSTART-SIGN-IN').disabled = false;
  });
      
    }
    //$("#QUICKSTART-SIGN-IN").disabled = true;
  }

  function signUp() {

    var email = $("#email-input").val();
    var password = $("#passwod-input").val();

    if (email.length < 4) {
      alert("Please enter a valid email address")
      return;
    }
    
    if (password.length <= 5) {
      alert("Please enter a password between 6-12 characters")
      return;
    }
  }

  auth.createUserWithEmailandPassword(email, password).catch(function(error) {
    var errorCode = error.errorCode
    var errorMessage = error.message;

    if (errorCode == "auth/weak-password") {
      alert("Your password is too weak")
    } else {
      alert(errorMessage);
    }

  }) */
  
 /*  // Updates minutes until arival every minute
  intervalId = setInterval(updateTime, (60 * 1000));

  // updateTime function to update the minutes until arrival
  function updateTime() {
    
    var firstArrival = database.ref("Train Information").getValue(firstArrival)

    firstArrival = moment(firstArrival, "HH:mm").subtract(1, "years")

    firstArrivalFormatted = moment(firstArrival, "X").format("MM/DD/YYYY");

    timeDifferance = moment().diff(moment(firstArrivalFormatted), "minutes");

    timeAway = timeDifferance % frequency;

    minUntilArrival = frequency - timeAway;

    nextTrainArrival = moment().add(minUntilArrival, "minutes")

    console.log(nextTrainArrival)

    // If statement when minutes until arrival = frequency, minutes changes to "arrived"
    if (nextTrainArrival === frequency) {

      nextTrainArrival.text("Arrived")

      // runs departure after 30 seconds and changes "arrived" to "departing soon"
      intervalid = setInterval(departure, (30*1000))
    };
  };

  function departure() {

    nextTrainArrival.text("Departing soon")
  } */
});