// input selection
const dayInput = document.querySelector('#dayInput');
const monthInput = document.querySelector('#monthInput');
const yearInput = document.querySelector('#yearInput');
const submit = document.querySelector('.submitBtn');

// result selection
const resultYear = document.querySelector('#resultYear');
const resultMonth = document.querySelector('#resultMonth');
const resultDay = document.querySelector('#resultDay');

function calculateAge (birthDate, today) {
    birthDate = new Date(birthDate);

    let years = (today.getFullYear() - birthDate.getFullYear());
    let months = ((today.getMonth() - birthDate.getMonth()))

    if (today.getMonth() < birthDate.getMonth() || 
        today.getMonth() == birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
        years--;
    }

    return {years, months};
}



submit.addEventListener('click', () => {
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;
    const birthday = new Date(year, (month-1), day);
    const today = new Date()
    const res = calculateAge(birthday,today);

    resultYear.innerHTML = res.years
    resultMonth.innerHTML = res.months
    console.log(res)
})