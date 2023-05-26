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

// error message selectors

const errorZeroBill = document.querySelector('#error-zero-bill');
const errorInavildBill = document.querySelector('#error-invalid-bill');
const errorZeroPeople = document.querySelector('#error-zero-people');
const errorInavildPeople = document.querySelector('#error-invalid-people');

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

// error variables
let isBillError = false;
let isTipError = false;
let isPeopleError = false;

function disableReset() {
  reset.classList.add("inactive");
  reset.classList.remove("active-reset", "reset");
  reset.setAttribute("disabled", "");
}

function enableReset() {
  reset.removeAttribute("disabled");
  reset.classList.add("active-reset", "reset");
  reset.classList.remove("inactive");
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
  isBillError = false
  isTipError = false
  isPeopleError = false
  tip.innerHTML = "$0.00";
  total.innerHTML = "$0.00";
  bill.classList.remove('error-border');
  people.classList.remove('error-border');
  custom.classList.remove('error-border');
  errorInavildBill.classList.add('hidden');
  errorInavildPeople.classList.add('hidden');
  errorZeroBill.classList.add('hidden');
  errorZeroPeople.classList.add('hidden');
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
  netTip = Number(billAmount * tipAmount);
  netCost = Number(netTip + billAmount);
  netCostPC = Number(netCost / peopleAmount);
  netTipPC = Number(netTip / peopleAmount);
}

function setResults() {
  tip.innerHTML = netTipPC;
  total.innerHTML = netCostPC;
}

function checkInputs() {
  if (bill.value || people.value || clickedButton || custom.value) {
    return enableReset();
  }
  disableReset();
}

reset.addEventListener("click", () => {
  zero();
});

// bill.addEventListener("keyup", (e) => {
//   if (!e.target.value) {
//     disableReset();
//     billAmount = null;
//   }
//   if (
//     e.target.value.match(/\d+\.?\d*/) &&
//     !(
//       e.target.value.match(/[a-zA-Z]/g) ||
//       e.target.value.match(/[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/g)
//     )
//   ) {
//     enableReset();
//     parseBill();
//     console.log(`bill total: $${billAmount}`);
//   }
//   if (
//     e.target.value.match(/[a-zA-Z]/g) ||
//     e.target.value.match(/[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/g)
//   ) {
//     disableReset();
//     billAmount = null;
//   }
// });

// people.addEventListener("keyup", (e) => {
//   if (!e.target.value) {
//     disableReset();
//     peopleAmount = null;
//   }
//   if (
//     e.target.value.match(/\d+\.?\d*/) &&
//     !(
//       e.target.value.match(/[a-zA-Z]/g) ||
//       e.target.value.match(/[-’/`~!#*$@_%+=,.^&(){}[\]|;:”<>?\\]/g)
//     )
//   ) {
//     enableReset();
//     parsePeople();
//     console.log(`people: ${peopleAmount}`);
//   }
//   if (
//     e.target.value.match(/[a-zA-Z]/g) ||
//     e.target.value.match(/[-’/`~!#*$@_%+=,.^&(){}[\]|;:”<>?\\]/g)
//   ) {
//     disableReset();
//     peopleAmount = null;
//   }
// });

custom.addEventListener("click", () => {
  prevButton = null;
  clickedButton = null;
  for (let button of buttons) {
    button.classList.remove("button-clicked");
  }
});

// custom.addEventListener("keyup", (e) => {
//   if (!e.target.value && !clickedButton && !(bill.value && people.value)) {
//     disableReset();
//   }
//   if (e.target.value.match(/\d+\.?\d*/)) {
//     enableReset();
//     parseTip();
//   }
//   if (
//     e.target.value.match(/[a-zA-Z]/g) ||
//     e.target.value.match(/[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/g)
//   ) {
//     disableReset();
//   }
// });

for (let button of buttons) {
  button.addEventListener("click", (e) => {
    isTipError = false;
    enableReset();
    e.target.classList.add("button-clicked");
    clickedButton = e.target;
    custom.value = "";

    if (prevButton !== null) {
      prevButton.classList.remove("button-clicked");
    }

    prevButton = e.target;
  });
}

widget.addEventListener("click", (e) => {
  const isFormElement =
    e.target.nodeName === "BUTTON" || e.target.nodeName === "INPUT";
  if (!isFormElement && clickedButton) {
    disableReset();
    prevButton.classList.remove("button-clicked");
    prevButton = null;
  }
});

// development check
document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") {
    return;
  }
  parseTip();
  calculate();
});

document.addEventListener('click', () => {
  checkInputs();
})

document.addEventListener('keyup', (e) => {
  // enable reset for any form activity
  checkInputs();

  // bill input error handling
  if(e.target.id === 'bill' && e.target.value === '0') {
    bill.classList.add('error-border');
    errorZeroBill.classList.remove('hidden');
    billAmount = null;
    isBillError = true;
    tip.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
  }
  if(
    e.target.id === 'bill' &&
    (
      e.target.value.match(/[a-zA-Z]/g) ||
      e.target.value.match(/[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/g)
    )
  ) {
    bill.classList.add('error-border')
    errorInavildBill.classList.remove('hidden');
    billAmount = null;
    isBillError = true;
    tip.innerHTML = "$0.00";
    total.innerHTML = "$0.00";

  }
  if (e.target.id === 'bill' && !e.target.value) {
    bill.classList.remove('error-border');
    errorInavildBill.classList.add('hidden');
    errorZeroBill.classList.add('hidden');
    billAmount = null;
    isBillError = false;
    tip.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
  }

  // custom tip input error handling
  if(e.target.id === 'custom' &&
     (
      e.target.value.match(/[a-zA-Z]/g) ||
      e.target.value.match(/[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/g) ||
      e.target.value === '0'
     )) {
    custom.classList.add('error-border');
    tipAmount = null;
    isTipError = true;
  }
  if(e.target.id === 'custom' && !e.target.value){
    custom.classList.remove('error-border');
    tipAmount = null;
    isTipError = false;
  }

  // people input error handling
  if(e.target.id === 'people' && e.target.value === "0") {
    people.classList.add('error-border');
    errorZeroPeople.classList.remove('hidden');
    peopleAmount = null;
    isPeopleError = true;
    tip.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
  }
  if(
    e.target.id === 'people' &&
    (
      e.target.value.match(/[a-zA-Z]/g) ||
      e.target.value.match(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g)
    )
  ) {
    people.classList.add('error-border')
    errorInavildPeople.classList.remove('hidden');
    peopleAmount = null;
    isPeopleError = true;
    tip.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
  }
  if (e.target.id === 'people' && !e.target.value) {
    people.classList.remove('error-border');
    errorInavildPeople.classList.add('hidden');
    errorZeroPeople.classList.add('hidden');
    peopleAmount = null;
    isPeopleError = false;
    tip.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
  }

  // parsing successful inputs
  if(!isBillError) {parseBill()}
  if(!isTipError) {parseTip()}
  if(!isPeopleError) {parsePeople()}


  // successful form handling
  if (billAmount && tipAmount && peopleAmount) {
    calculate();
    setResults();
  }
  
})