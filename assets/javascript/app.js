$(document).ready(function(){

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCoFcMGhawe0VwlO2d_rg2rVY79O_6XM9M",
    authDomain: "train-scheduler-779b3.firebaseapp.com",
    databaseURL: "https://train-scheduler-779b3.firebaseio.com",
    projectId: "train-scheduler-779b3",
    storageBucket: "",
    messagingSenderId: "187360712917"
  };
  firebase.initializeApp(config);
// set database equal to a variable
  var database = firebase.database();
// set initial variables
var train_name = "";
var destination = "";
var first_train = "";
var frequency = "";

// set on click event
$("button").on("click", function(){
    event.preventDefault();

    train_name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    first_train = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    console.log(train_name);
    console.log(destination);
    console.log(first_train);
    console.log(frequency);

    database.ref().push({
        train_name: train_name,
        destination: destination,
        first_train: first_train,
        frequency: frequency
    });

    $("form").trigger("reset");
});
database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
    var newTrain = snapshot.val();
    
    var newFrequency = newTrain.frequency;

    var first_time = newTrain.first_train;
    
    // first time pushed back one year to ensure it comes before the current time
    var first_time_converted = moment(first_time, "HH:mm").subtract(1, "years");
    console.log(first_time_converted);

    // current time
    var current = moment();
    console.log("Current time: "+moment(current).format("HH:mm"));

    // difference between current time and first_time_converted
    var diffTimes = moment().diff(moment(first_time_converted), "minutes");
    console.log("Difference between current time and first train: "+diffTimes);

    // calculate remainder using diffTimes % newFrequency
    var remainder = diffTimes % newFrequency;
    console.log(remainder);

    // minutes until next train
    var nextTrain = newFrequency - remainder;
    console.log(nextTrain);

    // time of next train;
    var nextTime = moment().add(nextTrain, "minutes");
    console.log("Next Train will arrive: "+ moment(nextTime).format("HH:mm"));
    $("tbody").append(`<tr>
                        <td>${newTrain.train_name}</td>
                        <td>${newTrain.destination}</td>
                        <td>${newTrain.frequency}</td>
                        <td id="nextArrival">${moment(nextTime).format("HH:mm")}</td>
                        <td id="minAway">${nextTrain}</td>
                    </tr>`)
})
});