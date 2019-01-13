
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const rent = store.dispatch(addExpense({description: 'rent', amount: 100, createdAt: 199}));
const coffee = store.dispatch(addExpense({description: 'coffee', amount: 300, createdAt: 15}));
const poopKnife = store.dispatch(addExpense({description: 'poop knife', amount: 1300, createdAt: 55}));
// store.dispatch(removeExpense({id: coffee.expense.id}));
// store.dispatch(editExpense(rent.expense.id, { amount: 55400 }));
//store.dispatch(setTextFilter('rent'));
//// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

//store.dispatch(setStartDate(0));
//store.dispatch(setEndDate(0));

const demoState = {
  expenses: [{
    id: 'dfasdfs',
    description: 'January Rent',
    note: 'Final payment for this address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};