"use strict"
// Variables

// Submit
const form = document.querySelector("form");

// Labels
const dayLabel = document.getElementById("day-label");
const monthLabel = document.getElementById("month-label");
const yearLabel = document.getElementById("year-label");

// Error Messages
const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

// Inputs
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

// Outputs
const dayOutput = document.querySelector('.input-date.day');
const monthOutput = document.querySelector('.input-date.month');
const yearOutput = document.querySelector('.input-date.year');

// Functions
//Check if the year is a leap year to validate the number of days in february

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0);
}

//Check the number of days in each month for proper calculation
function maxNumberOfDays(month, year) {
    let maximumNumberOfDays;
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            maximumNumberOfDays = 31;
            break;
        case 2:
            isLeapYear(year) ? 29 : 28;

        default:
            maximumNumberOfDays = 30;

    }

    return maximumNumberOfDays;
}

// Form EventListener

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect user date from form fields
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    //Current Date
    const currentdate = new Date(Date.now());
    const currentYear = currentdate.getFullYear();
    const currentMonth = currentdate.getMonth() + 1; // Months are zero based in JS that's why we add 1
    const currentDay = currentdate.getDate();


    // Validate User Input and Calculating days, months, and years
    let ageYears, ageMonths, ageDays;

    if (year > currentYear || year === "") {
        yearError.textContent = "Must be in the past";
        yearLabel.classList.add("input-label-error");
        yearInput.classList.add("input-error");
    } else {
        ageYears = currentYear - year;
        if (yearLabel.classList.contains("input-label-error") && yearInput.classList.contains("input-error")) {
            yearLabel.classList.remove("input-label-error");
            yearInput.classList.remove("input-error");
        }
    }

    if (month < 0 || month > 12 || month === "") {
        monthError.textContent = "Must be a valid month";
        monthLabel.classList.add("input-label-error");
        monthInput.classList.add("input-error");
    } else {
        ageMonths = currentMonth - month;
        if (monthLabel.classList.contains("input-label-error") && monthInput.classList.contains("input-error")) {
            monthLabel.classList.remove("input-label-error");
            monthInput.classList.remove("input-error");
        }
    }

    if (day < 0 || day > maxNumberOfDays(month, year) || day === "") {
        dayError.textContent = "Must be a valid day";
        dayLabel.classList.add("input-label-error");
        dayInput.classList.add("input-error");
    } else {
        ageDays = currentDay - day;
        if (dayLabel.classList.contains("input-label-error") && dayInput.classList.contains("input-error")) {
            dayLabel.classList.remove("input-label-error");
            dayInput.classList.remove("input-error");
        }
    }

    //Calculating the days, months, years incase the returned values where negative
    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
    }

    if (ageDays < 0) {
        ageDays = maxNumberOfDays(month > 1 ? month - 1 : 12) - Math.abs(ageDays);

        ageMonths--;
    }

    // Updating the output of years, months, and days
    Number.isInteger(ageYears) ? yearOutput.textContent = ageYears : yearOutput.textContent = "--";

    Number.isInteger(ageMonths) ? monthOutput.textContent = ageMonths : monthOutput.textContent = "--";

    Number.isInteger(ageDays) ? dayOutput.textContent = ageDays : dayOutput.textContent = "--";

})