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

function disableReset() {
    reset.classList.add('inactive');
    reset.classList.remove('active-reset');
    reset.setAttribute('disabled', '')
}

function enableReset() {
    reset.removeAttribute('disabled');
    reset.classList.add('active-reset');
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
    tip.innerHTML='$0.00'
    total.innerHTML='$0.00'
}

function parseBill() {
  const input = bill.value;
  const billAmount = Number(input.replace(/[^0-9\.]+/g, ""));
  console.log(billAmount);
}

function getTip() {}

function calculate(bill, tip, people) {
  const noPercent = tip.replace("%", "");
  const tipToNum = parseInt(noPercent);
  const tipPercent = tipToNum / 100;
  const tipAmount = parseInt(bill) * tipPercent;
  const grandTotal = tipAmount + parseInt(bill);

  const calculatedTip = tipAmount / people;
  const calculatedTotal = grandTotal / people;

  return { calculatedTip, calculatedTotal };
} 

function displayResults(obj) {
    tip.innerHTML = obj.calculatedTip;
    total.innerHTML = obj.calculatedTotal;
}

reset.addEventListener('click', () => {
    zero();
})

bill.addEventListener('keyup', () => {
    enableReset();
    parseBill();
}) 

people.addEventListener('keyup', () => {
    enableReset();
})

custom.addEventListener("click", () => {
  clickedButton = null;
  for (let button of buttons) {
    button.classList.remove("button-clicked");
  }
});

custom.addEventListener('keyup', () => {
    enableReset();
});

for(let button of buttons) {
    button.addEventListener('click', (e) => {
        enableReset();
        e.target.classList.add('button-clicked');
        clickedButton = e.target;

    if (prevButton !== null) {
      prevButton.classList.remove("button-clicked");
    }

        prevButton = e.target;
  });
}

widget.addEventListener('click', (e) => {
    const isButton = e
})