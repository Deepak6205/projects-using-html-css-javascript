// Select elements from the HTML
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

// Function to get expenses from localStorage
function getExpenses() {
  // Parse the stored expenses or return an empty array if no data is found
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

// Function to save expenses to localStorage
function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Function to display expenses on the UI
function renderExpenses() {
  // Clear the table first
  expenseList.innerHTML = "";

  // Get the list of expenses
  const expenses = getExpenses();

  // Loop through the expenses and create table rows
  expenses.forEach((expense, index) => {
    const row = document.createElement("tr"); // Create a new table row
    row.innerHTML = `
      <td>${expense.description}</td>
      <td>${expense.amount}</td>
      <td>${expense.category}</td>
      <td>
        <button class="btn edit" onclick="editExpense(${index})">Edit</button>
        <button class="btn delete" onclick="deleteExpense(${index})">Delete</button>
      </td>
    `;
    expenseList.appendChild(row); // Add the row to the table
  });
}

// Function to handle form submission
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Get the values entered in the form
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  // Get the existing expenses and add the new one
  const expenses = getExpenses();
  expenses.push({ description, amount, category });

  // Save the updated expenses and re-render the table
  saveExpenses(expenses);
  renderExpenses();

  // Clear the form fields
  expenseForm.reset();
});

// Function to edit an expense
function editExpense(index) {
  // Get the list of expenses
  const expenses = getExpenses();

  // Get the expense that needs editing
  const expense = expenses[index];

  // Fill the form fields with the current values
  document.getElementById("description").value = expense.description;
  document.getElementById("amount").value = expense.amount;
  document.getElementById("category").value = expense.category;

  // Remove the old expense from the list
  expenses.splice(index, 1);

  // Save the updated list and re-render the table
  saveExpenses(expenses);
  renderExpenses();
}

// Function to delete an expense
function deleteExpense(index) {
  // Get the list of expenses
  const expenses = getExpenses();

  // Remove the expense at the given index
  expenses.splice(index, 1);

  // Save the updated list and re-render the table
  saveExpenses(expenses);
  renderExpenses();
}

// Load the expenses when the page loads
renderExpenses();
