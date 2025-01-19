        // Basic Math Functions
        function add(a, b) {
            return a + b;
        }

        function subtract(a, b) {
            return a - b;
        }

        function multiply(a, b) {
            return a * b;
        }

        function divide(a, b) {
            if (b === 0) {
                return "Error: Cannot divide by 0";
            }
            return a / b;
        }

        // Operate Function
        function operate(operator, a, b) {
            switch (operator) {
                case '+':
                    return add(a, b);
                case '-':
                    return subtract(a, b);
                case '*':
                    return multiply(a, b);
                case '/':
                    return divide(a, b);
                default:
                    return "Error: Invalid operator";
            }
        }

        // Variables
        let firstNumber = "";
        let secondNumber = "";
        let operator = null;
        let result = null;

        // Display Update
        const display = document.getElementById("display");

        function updateDisplay(value) {
            display.textContent = value;
        }

        // Event Listeners
        const digits = document.querySelectorAll(".digit");
        const operators = document.querySelectorAll(".operator");
        const equals = document.querySelector(".equals");
        const clear = document.querySelector(".clear");
        const decimal = document.querySelector(".decimal");
        const backspace = document.querySelector(".backspace");

        // Digit Buttons
        digits.forEach(button => button.addEventListener("click", () => {
            if (operator === null) {
                firstNumber += button.textContent;
                updateDisplay(firstNumber);
            } else {
                secondNumber += button.textContent;
                updateDisplay(secondNumber);
            }
        }));

        // Operator Buttons
        operators.forEach(button => button.addEventListener("click", () => {
            if (firstNumber && !secondNumber) {
                operator = button.textContent;
            } else if (firstNumber && secondNumber) {
                result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
                updateDisplay(result);
                firstNumber = result.toString();
                secondNumber = "";
                operator = button.textContent;
            }
        }));

        // Equals Button
        equals.addEventListener("click", () => {
            if (firstNumber && secondNumber && operator) {
                result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
                updateDisplay(result);
                firstNumber = result.toString();
                secondNumber = "";
                operator = null;
            }
        });

        // Clear Button
        clear.addEventListener("click", () => {
            firstNumber = "";
            secondNumber = "";
            operator = null;
            result = null;
            updateDisplay("0");
        });

        // Decimal Button
        decimal.addEventListener("click", () => {
            if (operator === null && !firstNumber.includes(".")) {
                firstNumber += ".";
                updateDisplay(firstNumber);
            } else if (operator !== null && !secondNumber.includes(".")) {
                secondNumber += ".";
                updateDisplay(secondNumber);
            }
        });

        // Backspace Button
        backspace.addEventListener("click", () => {
            if (operator === null) {
                firstNumber = firstNumber.slice(0, -1);
                updateDisplay(firstNumber || "0");
            } else {
                secondNumber = secondNumber.slice(0, -1);
                updateDisplay(secondNumber || "0");
            }
        });

        // Keyboard Support
        document.addEventListener("keydown", (event) => {
            if (!isNaN(event.key)) {
                document.querySelector(`.digit[data-key="${event.key}"]`)?.click();
            } else if (["+", "-", "*", "/"].includes(event.key)) {
                document.querySelector(`.operator[data-key="${event.key}"]`)?.click();
            } else if (event.key === "=" || event.key === "Enter") {
                equals.click();
            } else if (event.key === "Backspace") {
                backspace.click();
            } else if (event.key === ".") {
                decimal.click();
            }
        });