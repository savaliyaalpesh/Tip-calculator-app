const billInput = document.querySelector('.bill-input');
const peopleInput = document.querySelector('.people-input');
const tipPerPerson = document.getElementById('tip-amount');
const totalPerPerson = document.getElementById('total-amount');
const tips = document.querySelectorAll(".tips");
const tipCustom = document.querySelector(".tip-custom");
const resetBtn = document.querySelector(".reset");
const error = document.querySelector(".error");

billInput.addEventListener('input', handleInput);
peopleInput.addEventListener('input', handleInput);
tips.forEach(tip => tip.addEventListener('click', handleClick));
tipCustom.addEventListener('input', handleInput);
resetBtn.addEventListener('click', reset);

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

function validateFloat(s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s) {
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function handleInput(event) {
    const { id, value } = event.target;

    if (id === 'bill-input') {
        if (validateFloat(value)) {
            billValue = parseFloat(value);
        } else {
            event.target.value = value.substring(0, value.length - 1);
        }
    }

    if (id === 'people-input') {
        if (validateInt(value)) {
            peopleValue = parseFloat(value);
        } else {
            event.target.value = value.substring(0, value.length - 1);
        }

        if (peopleValue <= 0) {
            error.style.display = 'flex';
            document.getElementById("people-input").style.border = '2px solid rgba(255, 0, 0, 0.6)'
        } else {
            error.style.display = 'none';
            document.getElementById("people-input").style.border = 'none'
        }
    }

    if (event.target.classList.contains('tip-custom')) {
        if (validateInt(value)) {
            tipValue = parseFloat(value / 100);
        } else {
            event.target.value = value.substring(0, value.length - 1);
        }
    }

    calculateTip();
}

function handleClick(event) {
    tips.forEach(tip => {
        tip.classList.remove('active-tip');
        if (event.target.innerHTML == tip.innerHTML) {
            tip.classList.add('active-tip');
            tipValue = parseFloat(tip.innerHTML) / 100;
        }
    });
    calculateTip();
}

function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue + (billValue * tipValue)) / peopleValue;
        tipPerPerson.innerHTML = `$${tipAmount.toFixed(2)}`;
        totalPerPerson.innerHTML = `$${total.toFixed(2)}`;
    }
}

function reset() {
    billInput.value = '';
    handleInput({ target: billInput });

    peopleInput.value = '';
    handleInput({ target: peopleInput });

    tipCustom.value = '';
    tips[2].click();
}
