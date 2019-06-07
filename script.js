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

const finalValues = [120000, 12000, 45000, 110000, 1000] //home, avc, bla, real estate, family business

var round = 0;
const maxRounds = 9;

const optionsTable = [
    [ //Round 1
        ["cash -1000", "stock1 1"], [], []
    ],
    [ // Round 2
        ["stock1 -1", "cash 2000"], [], []
    ],
    [ //Round 3
        ["cash -500", "salary 100"], ["cash -12000", "salary 6000"], ["cash -25000", "salary 8000"] 
    ],
    [ //Round 4
        ["cash -2000", "familyBusiness 1"], ["cash -15000", "stock2 1"], ["cash -30000", "stock2 2"]
    ],
    [ //Round 5
        ["cash 25000", "stock2 -1"], ["cash -75000", "stock2 3"], ["cash -4000", "salary 200"]
    ],
    [ //Round 6
        ["cash 2000", "salary -300"], ["cash -10000", "stock1 1"], ["cash -12000", "salary 4000"]
    ],
    [ //Round 7
        ["cash -3000", "familyBusiness 1"], ["cash -75000", "home 1"], []
    ],
    [ //Round 8
        ["cash -100000", "realEstate 1"], [], []
    ],
    [ //Round 9
        ["cash -110000", "realEstate 1"], ["cash -80000", "stock2 2"], ["cash -80000", "home 1"]
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

    if(assets.cash == -1 && salary == -1) {
        showLeaderboard();
        return;
    }

    for(i = 0; i < 4; i++) {
        if (form.colour[i].checked) {
            colour = form.colour[i].value;
            break;
        }
    }

    optionsDiv.style.display = "block";
    statusDiv.style.display = "block";
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
        if(splitElement[0] == "salary") {
            if (splitElement[1] < 0 && salary < Math.abs(splitElement[1])) {
                alert("Transaction impossible")
                updateStatus();
                return;
            }
            continue
        }
        if(splitElement[1] < 0 && assets[splitElement[0]] < Math.abs(splitElement[1])) {
            alert("Transaction impossible")
            updateStatus();
            return;
        }
    }

    for(i = 0; i < chosenOption.length; i++) {
        let splitElement = chosenOption[i].split(" ")
        if (splitElement[0] == "salary") {
            salary += parseInt(splitElement[1]);
            continue
        }
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
    updateStatus();
}

function nextRound() {
    assets.cash += salary;
    optionsDiv.style.display = "block";
    nextDiv.style.display = "none";
    updateStatus();
    round++;
    if(round >= maxRounds - 1) {
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
    let subRef = dataRef.child("players")
    
    playersRef.push({
        name: name,
        score: finalScore,
        colour: colour
    })

    nextDiv.style.display = "none";
    var finalScreen = document.getElementById("finalScore");
    finalScreen.style.display = "block";
    document.getElementById("finalLabel").innerHTML = "You final value was: " + finalScore;
}


function showLeaderboard() {
    optionsDiv.style.display = "none";
    statusDiv.style.display = "none";
    var results = document.getElementById("results")
    results.style.display = "block";

    var players = [];

    playersRef.orderByChild("score").on("child_added", function (data) {
        var newBox = document.createElement('div');
        results.appendChild(newBox);
        newBox.className = "row"
        var newName = document.createElement('div');
        newName.className = "subBox";
        newName.innerHTML = data.val().name;
        var newScore = document.createElement('div');
        newScore.className = "subBox";
        newScore.innerHTML = data.val().score;
        newBox.style.backgroundColor = data.val().colour;
        newBox.appendChild(newName);
        newBox.appendChild(newScore);
    });
    
    /*for(i = players.length - 1; i > -1; i--) {
        console.log(000)
        var newBox = document.createElement('div');
        results.appendChild(newBox);
        newBox.className = "results"
        var newName = document.createElement('div');
        newName.className = "subBox";
        newName.innerHTML = players[i].name;
        var newScore = document.createElement('div');
        newScore.className = "subBox";
        newScore.innerHTML = players[i].score;
        newBox.style.backgroundColor = players[i].colour;
        newBox.appendChild(newName);
        newBox.appendChild(newScore);
    }*/
}
