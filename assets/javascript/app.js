$(document).ready(function(){
  console.log ("ready!");

  var config = {
    apiKey: "AIzaSyBIJIlWvduXQGkM8UjBby1TG9idmiMcB_c",
    authDomain: "trainthing-c4965.firebaseapp.com",
    databaseURL: "https://trainthing-c4965.firebaseio.com",
    projectId: "trainthing-c4965",
    storageBucket: "trainthing-c4965.appspot.com",
    messagingSenderId: "177659940029"
  };
  firebase.initializeApp(config);



var database = firebase.database();

    $("#submit").on("click", function(event) {
      event.preventDefault();
      console.log("working");

      var trainName = $("#trainName").val().trim();
      var destination = $("#trainDestination").val().trim();
      var trainTimeUnix = moment($("#trainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
      var frequency = $("#trainFrequency").val().trim();

     var newTrain = {
        name: trainName,
        destination: destination,
        trainTime: trainTimeUnix,
        frequency: frequency
      }

   database.ref().push(newTrain);

  console.log(newTrain.trainName, newTrain.destination, newTrain.trainTimeUnix, newTrain.frequency)

  $("#trainName").val("");
  $("#trainDestination").val("");
  $("#trainTime").val("");
  $("#trainFrequency").val("");

  return false;

  });

    database.ref().on("child_added", function(childSnapshot, prevChildKey){

        console.log(childSnapshot.val());


    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().trainTime;

  
  var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
  var tMinutes = tFrequency - tRemainder;

  var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
  console.log(tMinutes);
  console.log(tArrival);

  console.log(moment().format("hh:mm A"));
  console.log(tArrival);
  console.log(moment().format("X"));

  $("#table").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

  });
});



























