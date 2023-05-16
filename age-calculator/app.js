// input selection
const dayInput = document.querySelector('#dayInput');
const monthInput = document.querySelector('#monthInput');
const yearInput = document.querySelector('#yearInput');
const submit = document.querySelector('.submitBtn');
const allInputs = document.querySelectorAll('.input')

// result selection
const resultYear = document.querySelector('#resultYear');
const resultMonth = document.querySelector('#resultMonth');
const resultDay = document.querySelector('#resultDay');

function calculateAge () {
    // collect data from inputs
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    // current date
    const today = new Date()

    // birth date
    const birthday = new Date(year, (month-1), day);

    // calculation
    const ageInMiliseconds = today.getTime() - birthday.getTime();
    const age = new Date(ageInMiliseconds);
    const resYears = age.getFullYear() - 1970;
    const resMonths = age.getMonth();
    const resDays = age.getDate() - 1;

    return {resYears, resMonths, resDays};
}

function setAge (res) {
    resultYear.innerHTML = res.resYears;
    resultMonth.innerHTML = res.resMonths;
    resultDay.innerHTML = res.resDays;
}



submit.addEventListener('click', () => {
    const res = calculateAge();
    setAge(res);
    
})

allInputs.forEach((item) => {
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const res = calculateAge()
            return setAge(res);
        }
        return
    })
})
