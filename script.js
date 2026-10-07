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

console.log(add(2,3));
console.log(subtract(2,3));
console.log(multiply(2,3));
console.log(divide(2,3));
console.log(divide(2,0));