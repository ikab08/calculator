let numberOne;
let operator;
let numberTwo;

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

function operate(operator,number1,number2){
    let result;
    switch (operator) {
        case "+":
            result = add(number1,number2);
            break;
        case "-":
            result = subtract(number1,number2);
            break;
        case "*":
            result = multiply(number1,number2);
            break;
        case "/":
            result = divide(number1,number2);
            break;
        default:
            break;
    }
    return result;
}