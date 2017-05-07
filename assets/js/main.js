var config = {
    apiKey: "AIzaSyD_dmVF993nDADOitQ36wMFvcJWdv3J92Q",
    authDomain: "trainwreck-62e3d.firebaseapp.com",
    databaseURL: "https://trainwreck-62e3d.firebaseio.com",
    projectId: "trainwreck-62e3d",
    storageBucket: "trainwreck-62e3d.appspot.com",
    messagingSenderId: "41943883048"
  };
  firebase.initializeApp(config);

  var db = firebase.database();
    $("#add-train").on("click", function() {
      event.preventDefault();

      var name = $("#name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTrainT = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
      var frequency = $("#frequency-input").val().trim();


      var trainHolder = {
  
      name: name,
      destination: destination,
      firstTrain: firstTrainT,
      frequency: frequency
    };
    
    db.ref().push(trainHolder);
     
    // Clears all of the text-boxes
    $("name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");  
   
    return false;
    
      });

    db.ref().on("child_added", function(childSnapshot, prevChildKey) {
      var cs = childSnapshot.val();
      
      var tName = cs.name;
      var tDestination = cs.destination;
      var tFrequency = cs.frequency;
      var tFirstTrain = cs.firstTrain;
      

      var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
      var remainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
      var tMinutes = tFrequency - remainder;
  
    // To calculate the arrival time
      var arrivalTime = moment().add(tMinutes, "m").format("hh:mm A");

     var tableRow = $("<tr>").attr("data-key", cs);
      
      $("<td>").text(tName).appendTo(tableRow);
      $("<td>").text(tDestination).appendTo(tableRow);
      $("<td>").text(tFrequency).appendTo(tableRow);
      $("<td>").text(arrivalTime).appendTo(tableRow);
      $("<td>").text(tMinutes).appendTo(tableRow);
      $("#trains").append(tableRow);
93  });