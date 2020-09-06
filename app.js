import {
  getInput,
  getDOMstrings,
  addListItem,
  clearFields,
  displayBudget,
  deleteListItem,
  displayPercentages,
} from "./src/ui_controller.js";

import {
  addItem,
  calculateBudget,
  getBudget,
  deleteItem,
  calculatePercentages,
  getPercentages,
} from "./src/budget_controller.js";

let setupEventListeners = () => {
  let DOM = getDOMstrings();

  document.querySelector(DOM.inputDescription).focus();

  document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

  document.addEventListener("keypress", (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      ctrlAddItem();
    }
  });

  document
    .querySelector(DOM.container)
    .addEventListener("click", ctrlDeleteItem);
};

let updateBudget = () => {
  // Calculate the budget
  calculateBudget();

  // Return the budget
  let budget = getBudget();

  // Display the budget on the UI
  displayBudget(budget);
};

let ctrlAddItem = () => {
  // Get the field input data
  let input = getInput();

  // Check input data for null
  if (input.description === "" || isNaN(input.value) || input.value < 0) {
    return;
  }

  // Add the Item to the budget controller
  let newItem = addItem(input.type, input.description, input.value);

  // Add Item to the UI
  addListItem(newItem, input.type);

  // Clear the inputs after adding to the UI
  clearFields();

  // Calculate and update budget
  updateBudget();

  updatePercentages();
};

let ctrlDeleteItem = (e) => {
  let DOM = getDOMstrings();
  let element =
    e.target.parentElement.parentElement.parentElement.parentElement;
  let p = e.target.parentElement;

  if (p.classList.contains(DOM.deleteBtn.slice(1))) {
    let isDeleted = deleteItem(element);

    if (isDeleted) {
      deleteListItem(element);
      updateBudget();
    }
  }

  updatePercentages();
};

let updatePercentages = () => {
  calculatePercentages();

  let percentages = getPercentages();

  displayPercentages(percentages);
};

let init = () => {
  console.log("Application has started");
  setupEventListeners();

  displayBudget({
    budget: 0,
    totalInc: 0,
    totalExp: 0,
    percentage: 0,
  });
};

init();
