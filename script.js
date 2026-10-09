let firstNumber;
let secondNumber;
let operator = "";

let justCalculated = false;

const display = document.querySelector("#display");
let displayText = display.textContent;

const btns = document.querySelectorAll('button');


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
            return add(number1, number2);
        case "-":
            return subtract(number1, number2);
        case "*":
            return multiply(number1, number2);
        case "/":
            return divide(number1, number2);
    }
}

function reset() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    displayText=0;
    updateDisplay(displayText);
}

function updateDisplay(newDisplay) {
    display.textContent = newDisplay;
}

function clicDigit(e, mode) {
    let value;
    if (mode == "keydown") { value = e.key;} 
    else { value = e.target.value;}
    
    if (justCalculated)  {
        if (displayText == "Undefined") reset(); 
        else firstNumber = displayText;
    }
    
    if (value == "+" || value == "-" || value == "*" || value == "/") {
        if (firstNumber) {
            operator = value;
            displayText += ` ${operator} `;
            updateDisplay(displayText);
        }
        if (justCalculated) secondNumber ="" ; justCalculated = false;
    } else if(value == "=") {
        if (firstNumber && (secondNumber == 0 || secondNumber)) {
            let n1 = parseFloat(firstNumber); 
            let n2 = parseFloat(secondNumber);
            let rz = displayText = operate(operator, n1, n2);
            updateDisplay(displayText); 
            justCalculated = true;
        }
    } else if(value == "delete"){
        reset();
    } else if(value == "back"){ 

    } else if (!isNaN(value) || value === ".")  {
        if (justCalculated) reset();

        if(displayText == "0" || displayText == "Undefined" || justCalculated) { 
            if (value == ".") { 
                firstNumber += value; 
                displayText += value; 
            } else { 
                firstNumber = value; 
                displayText = value; 
            }
            updateDisplay(displayText);
            justCalculated = false;
        } else {
            if(!operator) { 
                if (value == "." && firstNumber && firstNumber.includes(".")) return;
                displayText += value;
                firstNumber = displayText;
                updateDisplay(displayText);
            } else {
                if (value == "." && secondNumber && secondNumber.includes(".")) return;
                if (!secondNumber || secondNumber == "") { 
                    if (value == ".") { 
                        secondNumber = "0"+value; 
                        displayText += `0${value}`; 
                    } else {
                        secondNumber = value; 
                        displayText += value; 
                    }
                } else { 
                    if(secondNumber == "0") { 
                        if (value == ".") {
                            secondNumber = secondNumber += value;
                            displayText += value; 
                        } else {
                            secondNumber = value; 
                            displayText = displayText.slice(0, -1) + value;
                        }
                    } else {
                        secondNumber = secondNumber += value;
                        displayText += value; 
                    }
                }
                // displayText += value; 
                // secondNumber = (secondNumber || "") + value;
                updateDisplay(displayText);
            } 
            justCalculated = false;
        }
    }
}

btns.forEach(bouton => {
    bouton.addEventListener("click", (event)=> {
        clicDigit(event, "clic");
    });
});

document.addEventListener('keydown', function(event) {
    const value = event.key;
    if (!isNaN(value) || value === "." || value === "+" 
    || value === "-" || value === "*" || value === "/" 
    || value === "=" || value === "Enter" || value === "C" 
    || value === "Escape") {
        event.preventDefault(); // Prevent default behavior for keys like Enter and Escape
        clicDigit(event, "keydown");
    }
});