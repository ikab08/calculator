let firstNumber = "";
let secondNumber = "";
let operator = "";
let justCalculated = false;
let hasError = false;

const ERROR_MESSAGE = "Undefined";

const display = document.querySelector("#display");
let displayText = display.textContent;

const btns = document.querySelectorAll('.calculator button');

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
    return b === 0 ? ERROR_MESSAGE : a / b;
}

function operate(operator, number1, number2){
    switch (operator) {
        case "+":
            return add(number1, number2);
        case "-":
            return subtract(number1, number2);
        case "*":
            return multiply(number1, number2);
        case "/":
            return divide(number1, number2);
    }
}

function roundResult(n) {
    return parseFloat(n.toPrecision(12));
}

function reset() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    justCalculated = false;
    hasError = false;
    updateDisplay();
}

function updateDisplay() {
    if (hasError) {
        display.textContent = ERROR_MESSAGE;
    } else {
        if (justCalculated) {
            display.textContent = `${firstNumber}`;
        } else {
            const opText = operator ? ` ${operator} ` : "";
            display.textContent = `${firstNumber}${opText}${secondNumber}` || "0";
        }
    }
}

// after result or error, digit start a new operation
function startFreshIfNeeded() {
    if (hasError || justCalculated) reset();
}

function inputDigit(digit) {
    startFreshIfNeeded();

    if (!operator) {
        firstNumber = firstNumber === "0" ? digit : firstNumber + digit;
    } else {
        secondNumber = secondNumber === "0" ? digit : secondNumber + digit;
    }
    updateDisplay();
}

function inputDecimal() {
    startFreshIfNeeded();

    if (!operator) {
        if (firstNumber.includes(".")) return;
        firstNumber = (firstNumber || "0") + ".";
    } else {
        if (secondNumber.includes(".")) return;
        secondNumber = (secondNumber || "0") + ".";
    }
    updateDisplay();
}

function inputOperator(op) {
    if (hasError) return;

    // no input starting at 0
    if (firstNumber === "") firstNumber = "0";

    // operator already selected without 2e numb : replace the operator
    if (operator && secondNumber === "" && !justCalculated) {
        operator = op;
        updateDisplay();
        return;
    }

    // sequence (12 + 7 - 1) : calcul the intial pair first
    if (operator && secondNumber !== "" && !justCalculated) {
        calculate();
        if (hasError) return;
    }
    
    if (justCalculated) {
        secondNumber = "";
    }

    operator = op;
    justCalculated = false;
    updateDisplay();
}

function calculate() {
    if (firstNumber === "" || operator === "" || secondNumber === "") return;

    const result = operate(
        operator,
        parseFloat(firstNumber),
        parseFloat(secondNumber)
    );

    if (result === ERROR_MESSAGE) {
        hasError = true;
        firstNumber = "";
        secondNumber = "";
        operator = "";
    } else {
        firstNumber = String(roundResult(result));
        justCalculated = true;
    }
    updateDisplay();
}

function backspace() {
    if (hasError) {
        reset();
        return;
    }
    if (justCalculated) return; // don't cut off a result

    if (secondNumber !== "") {
        secondNumber = secondNumber.slice(0, -1);
    } else if (operator) {
        operator = "";
    } else {
        firstNumber = firstNumber.slice(0, -1);
    }
    updateDisplay();
}

function handleInput(value) {
    if (/^[0-9]$/.test(value)) inputDigit(value);
    else if (value === ".") inputDecimal();
    else if (["+", "-", "*", "/"].includes(value)) inputOperator(value);
    else if (value === "=") calculate();
    else if (value === "delete") reset();
    else if (value === "back") backspace();
}

btns.forEach((button) => {
    button.addEventListener("click", () => handleInput(button.value));
});

const keyMap = {
    Enter: "=",
    "=": "=",
    Escape: "delete",
    c: "delete",
    C: "delete",
    Backspace: "back",
};

document.addEventListener("keydown", (event) => {
    const value = keyMap[event.key] ?? event.key;
    const isHandled =
        /^[0-9.]$/.test(value) ||
        ["+", "-", "*", "/", "=", "delete", "back"].includes(value);

    if (isHandled) {
        // Prevent default behavior for keys like Enter and Escape
        event.preventDefault();
        handleInput(value);
    }
});

updateDisplay();