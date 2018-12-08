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

    // current time
    var current = moment();
    $("tbody").append(`<tr>
                        <td>${newTrain.train_name}</td>
                        <td>${newTrain.destination}</td>
                        <td>${newTrain.frequency}</td>
                        <td id="nextArrival"></td>
                        <td id="minAway"></td>
                    </tr>`)
})
});