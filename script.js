
document.getElementById('loan-form').addEventListener('submit', function (e) {

    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);
    setTimeout(clearEntries, 20000);
    e.preventDefault();
});

function calculateResults(e) {

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest-rates');
    const years = document.getElementById('years');
    const monthlyPayments = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayments.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    }
    else {
        showErrorMessage('Please check your number');
    }

}

function showErrorMessage(error) {

    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

    const errDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errDiv.className = 'alert alert-danger';
    errDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errDiv, heading);
    setTimeout(clearErrorMessage, 3000);

}

function clearErrorMessage() {
    document.querySelector('.alert').remove();
}

function clearEntries() {

    document.getElementById('amount').value = '';
    document.getElementById('years').value = '';
    document.getElementById('interest-rates').value = '';
    document.getElementById('total-interest').value = '';
    document.getElementById('total-payment').value = '';
    document.getElementById('monthly-payment').value = '';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    
}