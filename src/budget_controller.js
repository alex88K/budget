let Expense = function (id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;
  this.percentage = -1;
};

let Income = function (id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;
};

Expense.prototype.calcPercentage = function (totalIncome) {
  if (totalIncome === 0) return;

  this.percentage = Math.round((this.value / totalIncome) * 100);
};

Expense.prototype.getPercentage = function () {
  return this.percentage;
};

let data = {
  allItems: {
    exp: [],
    inc: [],
  },
  totals: {
    exp: 0,
    inc: 0,
  },
  budget: 0,
  percentage: -1,
};

let id = 0;

let addItem = (type, des, val) => {
  let newItem;

  if (type === "inc") {
    newItem = new Income(++id, des, val);
  } else {
    newItem = new Expense(++id, des, val);
  }

  data.allItems[type].push(newItem);

  return newItem;
};

let calculateTotal = (type) => {
  // calculate total Income and Expenses
  data.totals[type] = data.allItems[type].reduce(
    (acc, n) => (acc += n.value),
    0
  );
};

let calculateBudget = () => {
  // Calculate total Income and Expenses
  calculateTotal("exp");
  calculateTotal("inc");

  // Calculate the budget: Income - Expenses
  data.budget = data.totals.inc - data.totals.exp;

  // Calculate the percentage of Income we spent
  if (data.totals.inc > 0) {
    data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
  } else {
    data.percentage = -1;
  }
};

let getBudget = () => ({
  budget: data.budget,
  totalInc: data.totals.inc,
  totalExp: data.totals.exp,
  percentage: data.percentage,
});

let deleteItem = (target) => {
  let [type, id] = target.id.split("-");

  let inx = data.allItems[type.slice(0, 3)].findIndex((el, i) => el.id == id);

  if (inx !== -1) {
    data.allItems[type.slice(0, 3)].splice(inx, 1);
    return true;
  }

  return false;
};

let getPercentages = () => {
  let allPerc = data.allItems.exp.map((cur) => cur.getPercentage());

  return allPerc;
};

let calculatePercentages = () => {
  data.allItems.exp.forEach((cur) => {
    cur.calcPercentage(data.totals.inc);
  });
};

export {
  addItem,
  calculateBudget,
  getBudget,
  deleteItem,
  calculatePercentages,
  getPercentages,
};
