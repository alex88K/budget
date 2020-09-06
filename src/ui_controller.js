let DOMstrings = {
  budgetLabel: ".budget__value",
  incomeLabel: ".budget__income--value",
  expensesLabel: ".budget__expenses--value",
  percentageLabel: ".budget__expenses--percentage",
  inputType: ".add__type",
  inputDescription: ".add__description",
  inputValue: ".add__value",
  inputBtn: ".add__btn",
  addContainer: ".add__container",
  incomeContainer: ".income__list",
  expensesContainer: ".expenses__list",
  container: ".container",
  deleteBtn: ".item__delete--btn",
  expencesPercLabel: ".item__percentage",
  curMonth: ".budget__title--month",
};

let getInput = () => {
  return {
    type: document.querySelector(DOMstrings.inputType).value, // inc or exp
    description: document.querySelector(DOMstrings.inputDescription).value,
    value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
  };
};

let addListItem = (obj, type) => {
  let html = "";
  let element = "";

  if (type === "inc") {
    html =
      '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    element = document.querySelector(DOMstrings.incomeContainer);
  } else if (type === "exp") {
    html =
      '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%per%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    element = document.querySelector(DOMstrings.expensesContainer);
  }

  html = html.replace("%id%", obj.id);
  html = html.replace("%description%", obj.description);
  html = html.replace("%value%", formatNumber(obj.value, type));

  element.insertAdjacentHTML("beforeend", html);
};

let clearFields = () => {
  let inputs = document.querySelectorAll(DOMstrings.addContainer + "> input");
  inputs.forEach((inp) => (inp.value = ""));

  inputs[0].focus();
};

let displayBudget = ({ budget, totalInc, totalExp, percentage }) => {
  let budgetLabel = document.querySelector(DOMstrings.budgetLabel);
  let incomeLabel = document.querySelector(DOMstrings.incomeLabel);
  let expensesLabel = document.querySelector(DOMstrings.expensesLabel);
  let percentageLabel = document.querySelector(DOMstrings.percentageLabel);
  let type = "";

  budget > 0 ? (type = "inc") : (type = "exp");

  budgetLabel.innerHTML = formatNumber(budget, type);
  incomeLabel.innerHTML = formatNumber(totalInc, "inc");
  expensesLabel.innerHTML = formatNumber(totalExp, "exp");

  if (percentage > 0) {
    percentageLabel.innerHTML = percentage + "%";
  } else {
    percentageLabel.innerHTML = "---";
  }
};

let deleteListItem = (element) => {
  element.parentNode.removeChild(element);
};

let displayPercentages = (percentages) => {
  let fields = document.querySelectorAll(DOMstrings.expencesPercLabel);

  nodeListForEach(fields, function (current, index) {
    if (percentages[index] > 0) {
      current.textContent = percentages[index] + "%";
    } else {
      current.textContent = "---";
    }
  });
};

let formatNumber = (num, type) => {
  /*
    + or - before number
    exactly 2 dec points
    comma separating the thousands

    2341.1 -> + 2,341.10
    500 -> 500.00
  */

  num = Math.abs(num);
  num = num.toFixed(2);

  let numSplit = num.split(".");
  let int = numSplit[0];

  if (int.length > 3) {
    int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
  }

  let dec = numSplit[1];

  return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
};

let displayMonth = () => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let curMonth = months[new Date().getMonth()];

  document.querySelector(DOMstrings.curMonth).innerHTML = curMonth;
};

let changedType = (e) => {
  let fields = document.querySelectorAll(
    DOMstrings.inputType +
      "," +
      DOMstrings.inputDescription +
      "," +
      DOMstrings.inputValue
  );

  nodeListForEach(fields, function (cur) {
    cur.classList.toggle("red-focus");
  });

  document.querySelector(DOMstrings.inputBtn).classList.toggle("red");
};

let nodeListForEach = function (list, callback) {
  for (let i = 0; i < list.length; i++) {
    callback(list[i], i);
  }
};

let getDOMstrings = () => DOMstrings;

export {
  getInput,
  getDOMstrings,
  addListItem,
  clearFields,
  displayBudget,
  deleteListItem,
  displayPercentages,
  displayMonth,
  changedType,
};
