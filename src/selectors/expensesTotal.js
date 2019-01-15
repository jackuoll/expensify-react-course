export default (expenses) => {
  if (expenses.length === 0) {
    return 0;
  }
  const costs = expenses.map((expense) => expense.amount);
  return costs.reduce((total, amount) => amount + total);
};
