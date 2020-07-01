// selectors
// numkeys
const numkeys = document.querySelectorAll('[data-numkeys]');
// operators (opkeys)
const opkeys = document.querySelectorAll('[data-opkeys]');
// clear screen
const clear = document.querySelector('[data-clear]');
// delete button
const del = document.querySelector('[data-delete]');
// previous and current operands
const prevOperand = document.querySelector('[data-prevoperand]');
const currentOperand = document.querySelector('[data-currentoperand]');






// create a calculator class with methods
class Calculator {

    // constructor
    constructor(prevOperand, currentOperand) {
        this.prevOperand = prevOperand;
        this.currentOperand = currentOperand;

        // reset the values of both  current and previous operands at the start of the application
        this.clear();
    }



    // clearScreen
    clear() {
        this.currentOperand.innerHTML = '';
        this.prevOperand.innerHTML = '';

    }

    // delete
    del() {
        // pass a sliced version of the current operand as a parameter to the
        // updateCurrentOperand method which in turn sets it as the new value for the currentOperand
        this.updateCurrentOperand(this.currentOperand.innerHTML.slice(0, -1));
    }

    attachNumber(clickedKey) {
        // the clickedKey parameter is the numkey.value generated when each key is clicked
        // it is added/appended/attache (as a string) to the current value of the currentOperand.innerHTML
        clickedKey = currentOperand.innerHTML + clickedKey;

        // update the display after attaching/appending numbers
        this.updateCurrentOperand(clickedKey);


    }

    // print output
    updateCurrentOperand(operand) {

        this.currentOperand.innerHTML = operand;
    }

    // updatePreviousOperand
    updatePreviousOperand() {
        // move  the value of the current operand to the previous operand
        this.prevOperand.innerHTML = this.currentOperand.innerHTML;
        // clear  the currentOperand and prepare it to receive next imput
        this.currentOperand.innerHTML = '';
    }


    // select operator
    selectOperator(operator) {
        window.alert(operator);

    }

    // calclate
    calculate() {}

}

// create an instance of the calculator class
const calculator = new Calculator(prevOperand, currentOperand);


// clear display
clear.addEventListener('click', () => {
    calculator.clear();
});

// delete last input
del.addEventListener('click', () => {
    calculator.del();
});



// numkeys
numkeys.forEach(numkey => {
    // loop through the numkeys and add functions to them
    numkey.addEventListener('click', () => {

        calculator.attachNumber(numkey.value);
    });

});

// operatorKeys (opkeys)

opkeys.forEach(opkey => {

    opkey.addEventListener('click', () => {
        // pass the operatorKey value (ie plus of minus etc) as a parameter to the
        // calculator.selectOperator method
        calculator.selectOperator(opkey.value);
        calculator.updatePreviousOperand();
    });

});