const calculateButton = document.querySelector('.calculate-button');

calculateButton.addEventListener('click', function () {
    // Get the input values
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    // Clear previous errors
    document.querySelectorAll('.error').forEach(error => error.classList.add('hidden'));
    document.querySelectorAll('label').forEach(label => label.classList.remove('error-label'));

    let valid = true;

    // Validate day, month, and year
    if (day < 1 || day > 31 || isNaN(day)) {
        document.querySelector('.day-section .error').classList.remove('hidden');
        document.querySelector('label[for="day"]').classList.add('error-label');
        valid = false;
    }

    if (month < 1 || month > 12 || isNaN(month)) {
        document.querySelector('.month-section .error').classList.remove('hidden');
        document.querySelector('label[for="month"]').classList.add('error-label');
        valid = false;
    }

    if (year < 1900 || year > 2024 || isNaN(year)) {
        document.querySelector('.year-section .error').classList.remove('hidden');
        document.querySelector('label[for="year"]').classList.add('error-label');
        valid = false;
    }

    // If the inputs are valid, calculate the age
    if (valid) {
        // Create the birthdate object (months are 0-indexed, so we subtract 1 from the month)
        const birthdate = new Date(year, month - 1, day);
        const currentDate = new Date();

        // Calculate the age
        let years = currentDate.getFullYear() - birthdate.getFullYear();
        let months = currentDate.getMonth() - birthdate.getMonth();
        let days = currentDate.getDate() - birthdate.getDate();

        // If the current date is before the user's birthday this year, adjust the age
        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months = (months + 12) % 12;
        }

        // If the day is negative, adjust the months
        if (days < 0) {
            const daysInLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            days = daysInLastMonth - birthdate.getDate() + currentDate.getDate();
            months--;
        }

        // Display the result in the result section
        document.querySelector('.years').textContent = years;
        document.querySelector('.months').textContent = months >= 0 ? months : '--';
        document.querySelector('.days').textContent = days >= 0 ? days : '--';
    }
});
