// Expense Tracker App
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

// Load expenses from localStorage
const getExpenses = () => JSON.parse(localStorage.getItem("expenses")) || [];

// Save expenses to localStorage
const saveExpenses = (expenses) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

// Render expenses to UI
const renderExpenses = () => {
  expenseList.innerHTML = "";
  const expenses = getExpenses();

  expenses.forEach((expense, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.description}</td>
      <td>${expense.amount}</td>
      <td>${expense.category}</td>
      <td>
        <button class="btn edit" data-index="${index}">Edit</button>
        <button class="btn delete" data-index="${index}">Delete</button>
      </td>
    `;
    expenseList.appendChild(row);
  });
};

// Add a new expense
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  const expenses = getExpenses();
  expenses.push({ description, amount, category });
  saveExpenses(expenses);
  renderExpenses();

  expenseForm.reset();
});

// Handle Edit and Delete
expenseList.addEventListener("click", (e) => {
  const target = e.target;
  const index = target.dataset.index;
  const expenses = getExpenses();

  if (target.classList.contains("edit")) {
    // Edit expense
    const expense = expenses[index];
    document.getElementById("description").value = expense.description;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("category").value = expense.category;

    // Remove the current expense for updating
    expenses.splice(index, 1);
    saveExpenses(expenses);
    renderExpenses();
  } else if (target.classList.contains("delete")) {
    // Delete expense
    expenses.splice(index, 1);
    saveExpenses(expenses);
    renderExpenses();
  }
});

// Initial render
renderExpenses();