// input selection
const dayInput = document.querySelector("#dayInput");
const monthInput = document.querySelector("#monthInput");
const yearInput = document.querySelector("#yearInput");
const submit = document.querySelector(".submitBtn");
const allInputs = document.querySelectorAll(".input");
const dayContainer = document.querySelector("#dayContainer");
const monthContainer = document.querySelector("#monthContainer");
const yearContainer = document.querySelector("#yearContainer");
const subheadings = document.querySelectorAll(".subheading");
const inputArray = [dayInput, monthInput, yearInput];

// result selection
const resultYear = document.querySelector("#resultYear");
const resultMonth = document.querySelector("#resultMonth");
const resultDay = document.querySelector("#resultDay");

// error selection
const formError = document.querySelector("#errorForm");
const dayErrorInvalid = document.querySelector("#dayErrorInvalid");
const dayErrorEmpty = document.querySelector("#dayErrorEmpty");
const monthErrorInvalid = document.querySelector("#monthErrorInvalid");
const monthErrorEmpty = document.querySelector("#monthErrorEmpty");
const yearErrorInvalid = document.querySelector("#yearErrorInvalid");
const yearErrorEmpty = document.querySelector("#yearErrorEmpty");
const dayErrorContainer = document.querySelector("#dayErrorContainer");
const monthErrorContainer = document.querySelector("#monthErrorContainer");
const yearErrorContainer = document.querySelector("#yearErrorContainer");
const allErrors = [
  formError,
  dayErrorInvalid,
  dayErrorEmpty,
  monthErrorInvalid,
  monthErrorEmpty,
  yearErrorInvalid,
  yearErrorEmpty,
  dayErrorContainer,
  monthErrorContainer,
  yearErrorContainer,
];

// error styling information
const errorRed = "hsl(0, 100%, 67%)";
const errorBorder = `1px solid ${errorRed}`;

function calculateAge() {
  // collect data from inputs
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  // current date
  const today = new Date();

  // birth date
  const birthday = new Date(year, month - 1, day);

  // calculation
  const ageInMiliseconds = today.getTime() - birthday.getTime();
  const age = new Date(ageInMiliseconds);
  const resYears = age.getFullYear() - 1970;
  const resMonths = age.getMonth();
  const resDays = age.getDate() - 1;

  return { resYears, resMonths, resDays };
}

function setNoError() {
  for (let err of allErrors) {
    err.style.display = "none";
  }
  for (let input of inputArray) {
    input.style.border = "1px solid hsl(0, 0%, 94%)";
  }
  for (let subheading of subheadings) {
    subheading.style.color = "hsl(0, 0%, 8%)";
  }
}

function setAge(res) {
  resultYear.innerHTML = res.resYears;
  resultMonth.innerHTML = res.resMonths;
  resultDay.innerHTML = res.resDays;
}

function handleErrors() {
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  function setResult() {
    resultYear.innerHTML = "--";
    resultMonth.innerHTML = "--";
    resultDay.innerHTML = "--";
  }

  if (!day && !month && !year) {
    dayErrorContainer.style.display = "block";
    monthErrorContainer.style.display = "block";
    yearErrorContainer.style.display = "block";
    dayErrorEmpty.style.display = "block";
    monthErrorEmpty.style.display = "block";
    yearErrorEmpty.style.display = "block";
    dayInput.style.border = errorBorder;
    dayContainer.style.color = errorRed;
    monthInput.style.border = errorBorder;
    monthContainer.style.color = errorRed;
    yearInput.style.border = errorBorder;
    yearContainer.style.color = errorRed;
    for (let subheading of subheadings) {
      subheading.style.color = errorRed;
    }
    setResult();
    return true;
  }

  if (isNaN(year)) {
    yearErrorContainer.style.display = "block";
    yearErrorInvalid.style.display = "block";
    setResult();
    return true;
  }
  if (day >= 32) {
    console.log("day error");
    dayErrorContainer.style.display = "block";
    dayErrorInvalid.style.display = "block";
    setResult();
    return true;
  }
}

submit.addEventListener("click", () => {
  setNoError();
  const hasErrors = handleErrors();
  if (hasErrors === true) {
    return;
  }
  const res = calculateAge();
  setAge(res);
});

allInputs.forEach((item) => {
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      setNoError();
      const hasErrors = handleErrors();
      if (hasErrors === true) {
        return;
      }
      const res = calculateAge();
      return setAge(res);
    }
    return;
  });
});
