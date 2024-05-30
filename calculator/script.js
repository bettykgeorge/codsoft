
document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let previousInput = '';
    let operator = null;

    buttons.map(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');
            if (!value) {
                if (e.target.id === 'clear') {
                    currentInput = '';
                    previousInput = '';
                    operator = null;
                    updateDisplay('0');
                } else if (e.target.id === 'equals') {
                    if (operator && previousInput !== '' && currentInput !== '') {
                        const result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
                        updateDisplay(result);
                        previousInput = result;
                        currentInput = '';
                        operator = null;
                    }
                }
                return;
            }

            if (e.target.classList.contains('operator')) {
                if (operator) {
                    if (currentInput !== '') {
                        const result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
                        updateDisplay(result);
                        previousInput = result;
                        currentInput = '';
                    }
                } else {
                    previousInput = currentInput;
                    currentInput = '';
                }
                operator = value;
            } else {
                currentInput += value;
                updateDisplay(currentInput);
            }
        });
    });

    function updateDisplay(value) {
        display.textContent = value;
    }

    function calculate(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return 0;
        }
    }
});
