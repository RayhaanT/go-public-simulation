var playersRef = firebase.database().ref("players/");
var dataRef = new Firebase('https://go-public-e7abf.firebaseio.com/');
var salary = 0;
var cash = 0;
var colour;

function initialize(form) {
    salary = parseInt(form.salary.value);
    cash = parseInt(form.cash.value);
    for(i = 0; i < 4; i++) {
        if (form.colour[i].checked) {
            colour = form.colour[i].value;
            break;
        }
    }
    alert(colour);
}



/*var playersRef = ref.child("players");
playersRef.push({
    name: "John",
    number: 1,
    age: 30
});

playersRef.push({
    name: "Amanda",
    number: 2,
    age: 20
});*/

var ref = firebase.database().ref();

ref.on("value", function (snapshot) {
    console.log(snapshot.val());
}, function (error) {
    console.log("Error: " + error.code);
});

