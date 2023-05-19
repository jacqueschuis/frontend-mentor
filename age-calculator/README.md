# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See focus states for all interactive elements on the page

### Screenshot

![](./screenshot.PNG)

### Links

- [Live Site](https://frontend-mentor-age-calculator-khaki.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

### What I learned

I have gotten very accustomed to using Bootstrap as an easy way of styling everything, so I used this challenge as an opportunity to flex my CSS abilities. I used flexbox and a lot of `calc()` to make things responsive, and I think it turned out very well:

```css
.widgetContainer {
  width: calc(275px + (550 - 275) * ((100vw - 375px) / (1440 - 375)));
}
```
I also tried to pull the logic out of event handlers whenever possible and simplify different aspects into their own individual functions. I'm particularly happy with how I handled the validation:

```js
function validateForm() {
  const day = dayInput.value;
  const month = monthInput.value;
  const year = yearInput.value;
  
  let errors = [];
  
  if (!day) {errors.push('day-empty');}
  if (! month) {errors.push('month-empty')}
  if (!year) {errors.push('year-empty')}
  if (!errors.includes('day-empty') && day > 31 || day < 0) {errors.push('day-invalid')}
  if (!errors.includes('month-empty') && month > 12 || month < 0) {errors.push('month-invalid')}
  if (!errors.includes('day-empty') && day.toString().length !== 2 && (!(errors.includes('day-invalid')))) {
    errors.push('day-invalid');
  }
  if (!errors.includes('month-empty') && month.toString().length !== 2 && (!(errors.includes('month-invalid')))) {
    errors.push('month-invalid')
  }
  if (!errors.includes('year-empty') && year.toString().length !== 4 && (!(errors.includes('year-invalid')))) {
    errors.push('year-invalid')
  }
  if (!errors.includes('day-empty') && isNaN(day) && (!(errors.includes('day-invalid')))){
    errors.push('day-invalid');
  }
  if (!errors.includes('month-empty') && isNaN(month) && (!(errors.includes('month-invalid')))){
    errors.push('month-invalid');
  }
  if (!errors.includes('year-empty') && isNaN(year) && (!(errors.includes('year-invalid')))){
    errors.push('year-invalid')
  }
 return errors
}
```

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - This is a great overview of all the different flexbox properties.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Jacques Pariseau](https://www.your-site.com)
- Frontend Mentor - [@jacqueschuis](https://www.frontendmentor.io/profile/jacqueschuis)

