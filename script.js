var playersRef = firebase.database().ref("players/");
var dataRef = new Firebase('https://go-public-e7abf.firebaseio.com/');

var ref = firebase.database().ref();

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

var name;

const finalValues = [100000, 2500, 5000, 100001, 0] //home, avc, bla, real estate, family business

var round = 0;
const maxRounds = 10;

const optionsTable = [
    [ //Round 1
        ["cash -1000", "stock1 1"], [], []
    ],
    [ // Round 2
        ["stock1 -1", "cash 2000"], [], []
    ]
]

function updateStatus() {
    cashStat.innerHTML = assets.cash;
    salaryStat.innerHTML = salary;
    AVCStat.innerHTML = assets.stock1;
    BLAStat.innerHTML = assets.stock2;
    uncleStat.innerHTML = assets.familyBusiness;
    houseStat.innerHTML = assets.home;
    landStat.innerHTML = assets.realEstate;
}

function initialize(form) {
    salary = parseInt(form.startSalary.value);
    assets.cash = parseInt(form.startCash.value);
    name = form.name.value;

    for(i = 0; i < 4; i++) {
        if (form.colour[i].checked) {
            colour = form.colour[i].value;
            break;
        }
    }
}

function optionChosen(id) {    
    if(id == 3) {
        updateStatus();
        optionsDiv.style.display = "none";
        nextDiv.style.display = "block";
        return;
    }
    var chosenOption = optionsTable[round][id];

    for(i = 0; i < chosenOption.length; i++) {
        let splitElement = chosenOption[i].split(" ")
        if(splitElement[1] < 0 && assets[splitElement[0]] < Math.abs(splitElement[1])) {
            alert("Transaction impossible")
            updateStatus();
            return;
        }
    }

    for(i = 0; i < chosenOption.length; i++) {
        let splitElement = chosenOption[i].split(" ")
        assets[splitElement[0]] += parseInt(splitElement[1]);
        console.log(assets);
    }

    updateStatus();
    optionsDiv.style.display = "none";
    nextDiv.style.display = "block";
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
    updateStatus();
    round++;
    if(round >= maxRounds) {
        nextDiv = document.getElementById("finalButton")
    }
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
    var finalScore = assets.cash + assets.home * finalValues[0] + assets.stock1 * finalValues[1] + assets.stock2 * finalValues[2] + assets.realEstate * finalValues[3] + assets.familyBusiness * finalValues[4];
    playersRef.set({
        [name]: {
            score: finalScore,
            colour: colour
        }
    })

    nextDiv.style.display = "none";
    var finalScreen = document.getElementById("finalScore");
    finalScreen.style.display = "block";
    document.getElementById("finalLabel").innerHTML = "You final value was: " + finalScore;
}
