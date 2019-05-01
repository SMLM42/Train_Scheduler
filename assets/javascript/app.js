var intervalID; var time = 0; var initial = "00:00"
var config = {
    apiKey: "AIzaSyDVrsJ6K9jZlaW-O158VqrIkgC8mlVIhoM",
    authDomain: "trainz-31eac.firebaseapp.com",
    databaseURL: "https://trainz-31eac.firebaseio.com",
    projectId: "trainz-31eac",
    storageBucket: "trainz-31eac.appspot.com",
    messagingSenderId: "102568103742"
};
firebase.initializeApp(config);
var database = firebase.database();
var ref =

    $("#Submit").on("click", function (event) {
        event.preventDefault();
        var name = ""; var dest = ""; var freq = ""; var initial = ""; var next = ""; var minAway = ""
        name = $("#Name").val();
        dest = $("#Destination").val();
        initial = $("#Start").val();
        freq = $("#Frequency").val();
        database.ref().push({
            Name: name,
            Dest: dest,
            Init: initial,
            Freq: freq,
        })
    })
setInterval(updater, 1000)

function updater() {
    current();
    $("#display").empty();
    database.ref().on("child_added", function (snapshot) {
        var name = (snapshot.val().Name)
        var dest = (snapshot.val().Dest)
        initial = (snapshot.val().Init)
        freq = (snapshot.val().Freq)
        var converted = timeCheck(initial, freq)
        var newRow = $("<tr>");
        var newTrain = $("<td>").text(name);
        var newDest = $("<td>").text(dest);
        var newFreq = $("<td>").text(freq);
        var newNextTrain = $("<td>").text(converted[1]);
        var newETA = $("<td>").text(converted[0]);
        if (newTrain != "") {
            newRow.append(newTrain); newRow.append(newDest); newRow.append(newFreq); newRow.append(newNextTrain); newRow.append(newETA);
        }
        $("#display").append(newRow)
    })
}
function timeCheck(initial, freq) {
    var current = $("#Time").text();
    current = current.split(":")
    var h = current[0];
    var m = current[1];
    current = (parseInt(h * 60) + parseInt(m));
    // console.log("current" + current);
    if (initial != undefined) {
        initial = initial.split(":");
        h = initial[0];
        m = initial[1];
    }
    initial = (parseInt(h * 60) + parseInt(m));
    // console.log("initial" + initial);
    if (current > initial) {
        a = (Math.floor((current - initial) / freq) + 1);
        next = (initial + (freq * a));
        minAway = (next - current);
        next = convert(next);
    }
    if (current <= initial) {
        current = (current + 1440);
        a = (Math.floor((current - initial) / freq) + 1);
        next = (initial + (freq * a));
        minAway = (next - current);
        next = convert(next);
    }
    return [minAway, next]
}

function current() {
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var currentTime = (h + ":" + m);
    $("#Time").text(currentTime)
}
current(); updater()
function convert(a) {
    // console.log(a)
    var b = ((a - (a % 60)))
    b = (b / 60)
    if (b < 10) {
        b = ("0" + b)
    }
    var c = (a % 60)
    if (c < 10) {
        c = ("0" + c)
    }
    var time = (b + ":" + c)
    return (time)
}

// var str1 = "10:20:45",
//     str2 = "05:10:10";

// // if (str1 > str2)
// //     alert("Time 1 is later than time 2");
// // else
// //     alert("Time 2 is later than time 1");