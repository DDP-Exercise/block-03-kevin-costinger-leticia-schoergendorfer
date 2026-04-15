"use strict";
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     You - 2026-03-25
 *******************************************************/
let sumExpenses = 0; //Use this variable to keep the sum up to date.

function submitForm(e){
    //DONE: Prevent the default behavior of the submit button.
    e.preventDefault();

    //DONE: Validate the form. If everything is fine, add the expense to the tracker and reset the form.
    
    let dateInput = document.querySelector("#date");
    let amountInput = document.querySelector("#amount");
    let textInput = document.querySelector("#text");

    let date = dateInput.value;
    let amount = parseFloat(amountInput.value);
    let text = textInput.value;

    // Validation
    if(isEmpty(date)){
        dateInput.focus();
        return;
    }

    if(isNaN(amount) || amount < 0.01){
        amountInput.focus();
        return;
    }

    if(isEmpty(text) || text.length < 3){
        textInput.focus();
        return;
    }

    // Table row
    let tbody = document.querySelector("tbody");
    let tr = document.createElement("tr");

    let tdDate = document.createElement("td");
    tdDate.textContent = date;

    let tdAmount = document.createElement("td");
    tdAmount.textContent = formatEuro(amount);

    let tdText = document.createElement("td");
    tdText.textContent = text;

    let tdDelete = document.createElement("td");
    let btn = document.createElement("button");
    btn.textContent = "X";

    btn.addEventListener("click", function(){
        sumExpenses -= amount;
        document.querySelector("#sum").textContent = formatEuro(sumExpenses);
        tr.remove();
    });

    tdDelete.append(btn);

    tr.append(tdDate);
    tr.append(tdAmount);
    tr.append(tdText);
    tr.append(tdDelete);

    tbody.append(tr);

    // sum update 
    sumExpenses += amount;
    document.querySelector("#sum").textContent = formatEuro(sumExpenses);

    // Reset form
    e.target.reset();
}

/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) {
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}
