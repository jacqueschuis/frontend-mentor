const widget = document.querySelector(".widget");

// selecting elements of the calculator
const bill = document.querySelector("#bill");

const fivePercent = document.querySelector("#five-percent");
const tenPercent = document.querySelector("#ten-percent");
const fifteenPercent = document.querySelector("#fifteen-percent");
const twentyFivePercent = document.querySelector("#twenty-five-percent");
const fiftyPercent = document.querySelector("#fifty-percent");
const custom = document.querySelector("#custom");

const buttons = [
  fivePercent,
  tenPercent,
  fifteenPercent,
  twentyFivePercent,
  fiftyPercent,
];

const people = document.querySelector("#people");

// selecting elements of the result

const tip = document.querySelector("#tip-result");
const total = document.querySelector("#total-result");

const reset = document.querySelector("#reset");

// variables for handling button clicks

let prevButton = null;
let clickedButton = null;

// variables for the input amounts
let billAmount;
let tipAmount;
let peopleAmount;

// result variables
let netCost;
let netTip;
let netCostPC;
let netTipPC;

function disableReset() {
    reset.classList.add('inactive');
    reset.classList.remove('active-reset', 'reset');
    reset.setAttribute('disabled', '')
}

function enableReset() {
    reset.removeAttribute('disabled');
    reset.classList.add('active-reset','reset');
    reset.classList.remove('inactive');
}

function zero() {
  bill.value = "";
  people.value = "";
  custom.value = "";
    for (let button of buttons) {
    button.classList.remove("button-clicked");
    }
  disableReset();
  clickedButton = null;
  prevButton = null;
  billAmount = null;
  tipAmount = null;
  netCost = null;
  netTip = null;
  netCostPC = null;
  netTipPC = null;
  tip.innerHTML='$0.00'
  total.innerHTML='$0.00'
}

function parseBill() {
  billAmount = Number(bill.value);
}

function parsePeople() {
  peopleAmount = Number(people.value);
}

function parseTip() {
  if (clickedButton) {
    tipAmount = Number(clickedButton.value);
    return console.log(tipAmount);
  }
  tipAmount = Number(custom.value / 100);
}

function calculate() {
  if (!(billAmount && tipAmount && peopleAmount)) {
    return;
  }
  netTip = Number(billAmount * tipAmount);
  netCost = Number(netTip + billAmount);
  netCostPC = Number(netCost / peopleAmount);
  netTipPC = Number(netTip / peopleAmount);
  console.log(`tip amount per person: $${netTipPC}`)
  console.log(`total amount per person: $${netCostPC}`)
} 

function displayResults(obj) {
    tip.innerHTML = obj.calculatedTip;
    total.innerHTML = obj.calculatedTotal;
}

reset.addEventListener('click', () => {
    zero();
})

bill.addEventListener('keyup', (e) => {
  if (!e.target.value){
    disableReset();
    billAmount = null;
  }
  if (e.target.value.match(/\d+\.?\d*/) && !(e.target.value.match(/[a-zA-Z]/g) || e.target.value.match(/[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/g))) {
    enableReset();
    parseBill();
    console.log(`bill total: $${billAmount}`)
  }
  if (e.target.value.match(/[a-zA-Z]/g) || e.target.value.match(/[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/g)) {
    disableReset();
    billAmount = null;
  }
}) 

people.addEventListener('keyup', (e) => {
  if (!e.target.value){
    disableReset();
    peopleAmount = null;
  }
  if (e.target.value.match(/\d+\.?\d*/) && !(e.target.value.match(/[a-zA-Z]/g) || e.target.value.match(/[-’/`~!#*$@_%+=,.^&(){}[\]|;:”<>?\\]/g))) {
    enableReset();
    parsePeople();
    console.log(`people: ${peopleAmount}`)
  }
  if (e.target.value.match(/[a-zA-Z]/g) || e.target.value.match(/[-’/`~!#*$@_%+=,.^&(){}[\]|;:”<>?\\]/g)) {
    disableReset();
    peopleAmount = null;

  }})

custom.addEventListener("click", () => {
  clickedButton = null;
  for (let button of buttons) {
    button.classList.remove("button-clicked");
  }
});

custom.addEventListener('keyup', (e) => {
  if (!(e.target.value) && !clickedButton && !(bill.value && people.value)){
    disableReset();
  }
  if (e.target.value.match(/\d+\.?\d*/)) {
    enableReset();
    parseTip();
  }
  if (e.target.value.match(/[a-zA-Z]/g) || e.target.value.match(/[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/g)) {
    disableReset();
  }});

for(let button of buttons) {
    button.addEventListener('click', (e) => {
        enableReset();
        e.target.classList.add('button-clicked');
        clickedButton = e.target;
        custom.value = '';

    if (prevButton !== null) {
      prevButton.classList.remove("button-clicked");
    }

        prevButton = e.target;
  });
}

widget.addEventListener('click', (e) => {
  const isFormElement = e.target.nodeName === 'BUTTON' || e.target.nodeName === 'INPUT'
  if (!isFormElement && clickedButton) {
    disableReset();
    prevButton.classList.remove('button-clicked');
    prevButton = null;
  }
})

// development check
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') {
    return
  }
  parseTip();
  calculate();
})