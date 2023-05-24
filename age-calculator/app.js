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
const errorBorder = `2px solid ${errorRed}`;

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
    input.style.borderColor = "hsl(0, 1%, 44%)";
  }
  for (let subheading of subheadings) {
    subheading.style.color = "hsl(0, 1%, 44%)";
  }
}

function setAge(res) {
  resultYear.innerHTML = res.resYears;
  resultMonth.innerHTML = res.resMonths;
  resultDay.innerHTML = res.resDays;
}

function validateForm() {
  const day = dayInput.value;
  const month = monthInput.value;
  const year = yearInput.value;

  let errors = [];

  if (!day) {
    errors.push("day-empty");
  }
  if (!month) {
    errors.push("month-empty");
  }
  if (!year) {
    errors.push("year-empty");
  }
  if ((!errors.includes("day-empty") && day > 31) || day < 0) {
    errors.push("day-invalid");
  }
  if ((!errors.includes("month-empty") && month > 12) || month < 0) {
    errors.push("month-invalid");
  }
  if (
    !errors.includes("day-empty") &&
    day.toString().length !== 2 &&
    !errors.includes("day-invalid")
  ) {
    errors.push("day-invalid");
  }
  if (
    !errors.includes("month-empty") &&
    month.toString().length !== 2 &&
    !errors.includes("month-invalid")
  ) {
    errors.push("month-invalid");
  }
  if (
    !errors.includes("year-empty") &&
    year.toString().length !== 4 &&
    !errors.includes("year-invalid")
  ) {
    errors.push("year-invalid");
  }
  if (
    !errors.includes("day-empty") &&
    isNaN(day) &&
    !errors.includes("day-invalid")
  ) {
    errors.push("day-invalid");
  }
  if (
    !errors.includes("month-empty") &&
    isNaN(month) &&
    !errors.includes("month-invalid")
  ) {
    errors.push("month-invalid");
  }
  if (
    !errors.includes("year-empty") &&
    isNaN(year) &&
    !errors.includes("year-invalid")
  ) {
    errors.push("year-invalid");
  }
  return errors;
}

function handleErrors(errors) {
  function setResult() {
    resultYear.innerHTML = "--";
    resultMonth.innerHTML = "--";
    resultDay.innerHTML = "--";
  }

  if (
    errors.includes("day-empty") &&
    errors.includes("month-empty") &&
    errors.includes("year-empty")
  ) {
    setResult();
    dayErrorContainer.style.display = "block";
    formError.style.display = "block";
    dayInput.style.border = errorBorder;
    dayContainer.style.color = errorRed;
    monthInput.style.border = errorBorder;
    monthContainer.style.color = errorRed;
    yearInput.style.border = errorBorder;
    yearContainer.style.color = errorRed;
    for (let subheading of subheadings) {
      subheading.style.color = errorRed;
    }
  } else {
    if (errors.includes("day-empty")) {
      setResult();
      dayErrorContainer.style.display = "block";
      dayErrorEmpty.style.display = "block";
      dayInput.style.border = errorBorder;
      dayContainer.style.color = errorRed;
      for (let subheading of subheadings) {
        subheading.style.color = errorRed;
      }
    }
    if (errors.includes("month-empty")) {
      setResult();
      monthErrorContainer.style.display = "block";
      monthErrorEmpty.style.display = "block";
      monthInput.style.border = errorBorder;
      monthContainer.style.color = errorRed;
      for (let subheading of subheadings) {
        subheading.style.color = errorRed;
      }
    }
    if (errors.includes("year-empty")) {
      setResult();
      yearErrorContainer.style.display = "block";
      yearErrorEmpty.style.display = "block";
      yearInput.style.border = errorBorder;
      yearContainer.style.color = errorRed;
      for (let subheading of subheadings) {
        subheading.style.color = errorRed;
      }
    }
  }

  if (errors.includes("day-invalid")) {
    setResult();
    dayErrorContainer.style.display = "block";
    dayErrorInvalid.style.display = "block";
    dayInput.style.border = errorBorder;
    dayInput.value = "";
    for (let subheading of subheadings) {
      subheading.style.color = errorRed;
    }
  }
  if (errors.includes("month-invalid")) {
    setResult();
    monthErrorContainer.style.display = "block";
    monthErrorInvalid.style.display = "block";
    monthInput.style.border = errorBorder;
    monthInput.value = "";
    for (let subheading of subheadings) {
      subheading.style.color = errorRed;
    }
  }
  if (errors.includes("year-invalid")) {
    setResult();
    yearErrorContainer.style.display = "block";
    yearErrorInvalid.style.display = "block";
    yearInput.style.border = errorBorder;
    yearInput.value = "";
    for (let subheading of subheadings) {
      subheading.style.color = errorRed;
    }
  }
}

submit.addEventListener("click", () => {
  setNoError();
  const errors = validateForm();
  if (errors.length) {
    return handleErrors(errors);
  }
  const res = calculateAge();
  return setAge(res);
});

allInputs.forEach((item) => {
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      setNoError();
      const errors = validateForm();
      if (errors.length) {
        return handleErrors(errors);
      }
      const res = calculateAge();
      return setAge(res);
    }
    return;
  });
});
