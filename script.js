let numberOne;
let operator;
let numberTwo;

let justCalculated = false;

const displayText = document.querySelector("#display");

const btnNumber = document.querySelectorAll(".number");
const btnOperator = document.querySelectorAll(".operator");

const btnDelete = document.querySelector("#delete");

function add(a, b){
    return a+b ;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    if (b!=0)  {
        return a/b; 
    } else {
        return "Undefined"
    } 
}

function operate(operator, number1, number2){
    switch (operator) {
        case "+":
            return result = add(number1, number2);
        case "-":
            return result = subtract(number1, number2);
        case "*":
            return result = multiply(number1, number2);
        case "/":
            return result = divide(number1, number2);
    }
}

function updateDisplay(newDisplay, status) {
    if (status == "normal") {
        displayText.innerHTML = newDisplay
    } else {
        displayText.innerHTML += newDisplay;
    }
}

function clicDigit(e) {
    if(displayText.innerHTML == 0 || justCalculated) {
        updateDisplay(e.target.id, "normal");
        numberOne = parseFloat(displayText.innerHTML);
        justCalculated == false;
    } else {
        numberTwo = parseFloat(e.target.id);
        updateDisplay(numberTwo, "concat");
    }
}

btnNumber.forEach(bouton => {
    bouton.addEventListener("click", clicDigit);
});

btnOperator.forEach(bouton => {
    bouton.addEventListener('click', (e)=> {
        if (justCalculated) numberOne = parseFloat(displayText.innerHTML); justCalculated = false;

        if(e.target.id == "equal") {
            updateDisplay(operate(operator, numberOne, numberTwo), "normal");
            justCalculated = true;
        } else {
            operator = e.target.textContent;
            updateDisplay(" "+operator+" ", "concat");
        }
    });
})

btnDelete.addEventListener("click", ()=> {
    numberOne = "";
    numberTwo = "";
    operator = "";
    updateDisplay(0, "normal");
})