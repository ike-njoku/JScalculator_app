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

// equals to (=)
const equalKey = document.querySelector('[data-calculate]');

// more button (elipses)
const more = document.querySelector('[data-more]');




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
        this.operator = '';

    }

    // delete
    del() {
        // pass a sliced version of the current operand as a parameter to the
        // updateCurrentOperand method which in turn sets it as the new value for the currentOperand
        this.updateCurrentOperand(this.currentOperand.innerHTML.slice(0, -1));
    }


    attachNumber(clickedKey) {

        // check if the key added is the decimal point
        // ensure that the number added can only have one decimal point
        if (this.currentOperand.innerHTML.includes('.') == true && clickedKey == '.') return;



        // the clickedKey parameter is the numkey.value generated when each key is clicked
        // it is added/appended/attached (as a string) to the current value of the currentOperand.innerHTML
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
        if (this.operator) this.prevOperand.innerHTML = `${this.currentOperand.innerHTML} ${this.operator}`;
        // clear  the currentOperand and prepare it to receive next imput

        this.currentOperand.innerHTML = '';
    }


    // select operator
    selectOperator(operator) {
        // check if there was a previous input
        // that has not been computed
        if (this.operator) this.calculate();

        // select an operator
        this.operator = operator;

    }

    // calclate
    calculate() {
        // perform calculations
        // slice out the last index of the previous operand (because it is an operator symbol that
        // cannot be converted to a floatingPoint variable )
        this.a = parseFloat(this.prevOperand.innerHTML.slice(0, -1));
        this.b = parseFloat(this.currentOperand.innerHTML);


        // use the operator to compute (using switch case)
        switch (this.operator) {
            case '+':
                // addition
                this.c = this.a + this.b;
                break;

            case '-':
                // subtraction
                this.c = this.a - this.b;
                break;

            case '*':
                // multiplication
                this.c = this.a * this.b;
                break;
            case '/':
                // multiplication
                this.c = this.a / this.b;
                break;

            default:
                return;
        }


        // update the display( currentOperand)
        this.updateCurrentOperand(this.c);
        this.operator = '';
        // this.updatePreviousOperand()




    }

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

        // negate if the first input is a minus sign and there is no previous or current operand
        if (calculator.currentOperand.innerHTML == '' && calculator.prevOperand.innerHTML == '' && opkey.value == '-') { calculator.attachNumber(opkey.value); return; }

        // if there is no currentOperand, it means theres nothing to compute
        // so return
        if (calculator.currentOperand.innerHTML == '') return;

        calculator.selectOperator(opkey.value);

        calculator.updatePreviousOperand();
    });

});

// equals /compute/calculate
equalKey.addEventListener('click', () => {
    if (calculator.prevOperand.innerHTML.length && calculator.currentOperand.innerHTML.length) calculator.calculate();


});

more.addEventListener('click', () => {
    window.alert('more functions coming up in subsequent version  ');
});