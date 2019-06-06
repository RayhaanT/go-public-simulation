var playersRef = firebase.database().ref("players/");
var dataRef = new Firebase('https://go-public-e7abf.firebaseio.com/');

var ref = firebase.database().ref();

ref.on("value", function (snapshot) {
    console.log(snapshot.val());
}, function (error) {
    console.log("Error: " + error.code);
});


var salary = 0;
var colour;
var assets = {
    cash: 0,
    home: 0,
    stock1: 0,
    stock2: 0,
    realEstate: 0,
    familyBusiness: 0
}

var optionsDiv = document.getElementById("options")
var nextDiv = document.getElementById("next")
var statusDiv = document.getElementById("status")

var cashStat = document.getElementById("cash")
var salaryStat = document.getElementById("salary")
var AVCStat = document.getElementById("AVC")
var BLAStat = document.getElementById("BLA")
var uncleStat = document.getElementById("uncle")
var houseStat = document.getElementById("house")
var landStat = document.getElementById("land")

const finalValues = [100000, 2500, 5000, 100001, 20]

function updateStatus() {
    cashStat.innerHTML = assets.cash;
    salaryStat.innerHTML = salary;
    AVCStat = assets.stock1;
    BLAStat = assets.stock2;
    uncleState = assets.familyBusiness;
    houseState = assets.home;
    landStat = assets.realEstate;
}

function initialize(form) {
    salary = parseInt(form.startSalary.value);
    assets.cash = parseInt(form.startCash.value);

    for(i = 0; i < 4; i++) {
        if (form.colour[i].checked) {
            colour = form.colour[i].value;
            break;
        }
    }
}

function optionChosen(id) {
    optionsDiv.style.display = "none";
    nextDiv.style.display = "block";
    
    if(id == 4) {
        return;
    }
}

function hideForm() {
    event.preventDefault()
    var hideDiv = document.getElementById("initialization")
    hideDiv.style.display = "none";
    //assets.cash += salary;
    optionsDiv.style.display = "block";
    statusDiv.style.display = "block";
    updateStatus();
}

function nextRound() {
    assets.cash += salary;
    optionsDiv.style.display = "block";
    nextDiv.style.display = "none";
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

function finalize() {

}
