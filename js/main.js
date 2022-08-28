"use strict";

const userInput = document.getElementById("user__input");
const  numbersBtnEl = document.querySelectorAll(".btn-num");
const  operatorBtnEl = document.querySelectorAll(".btn-operator");
const  btnEqualEl = document.querySelector(".button__equal");
const  btnDeleteEl = document.querySelector(".button__del");
const  btnResetEl = document.querySelector(".button__reset");
const link = document.querySelector(".theme-link");
const themeBtn = document.querySelectorAll(".theme__btn");

let expression = [];
let currentOperand = "";
let operator = false;

function changeTheme(btn) {
				btn.addEventListener("click", function(){
								link.href = `css/theme_${btn.textContent}.css`
				});
}

themeBtn.forEach(btn => {
				changeTheme(btn);
});

numbersBtnEl.forEach(btn => {
				btn.addEventListener("click", function() {						
								if (btn.value === ".") {
												if (!currentOperand.match(/[.]/)) {
																userInput.value += btn.value;
																currentOperand += btn.value;
																expression.push(btn.value);
												}
								}
								else {
												currentOperand += btn.value;
												expression.push(btn.value);
												userInput.value += btn.value;
								}																								
								operator = true;
				});												
});


operatorBtnEl.forEach(btn => {
				btn.addEventListener("click", function()
				{
								if (operator) {											
												expression.push(btn.value);			
												if (btn.value === "*") {
																userInput.value += "×";
												}
												else {
																userInput.value += btn.value;
												}												
												operator = false;										
												currentOperand = "";
								}
				});
});


btnEqualEl.addEventListener("click", function() {
				//catch syntax error
				//evaluate the string and execute as js code
				try {
								let result = expression.join("");
								result = result.replace("×", "*");		
								userInput.value = eval(result).toFixed(5);
								
								expression = userInput.value.split("");
								currentOperand = userInput.value;
				}
				catch {
								//do nothing
				}
});


btnDeleteEl.addEventListener("click", function() {
				//remove last character
				expression.pop();				
				userInput.value = userInput.value.slice(0, -1);
				currentOperand = currentOperand.slice(0, -1);
				operator = true;
});


btnResetEl.addEventListener("click", function() {
				//reset all values
				expression = [];
				userInput.value = "";
				currentOperand = "";
});
