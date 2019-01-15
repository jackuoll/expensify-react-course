import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const toRemove = expenses[1];
  const action = {
    type: 'REMOVE_EXPENSE',
    id: toRemove.id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if no id found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: 'fake'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const expense = {
    description: 'My expense',
    note: 'My note',
    amount: 11550,
    createdAt: 1500,
    id: '5'
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([
    ...expenses,
    expense
  ]);
});

test('should edit an expense', () => {
  const expenseToEdit = expenses[0];
  const note = 'oopsie doopsie i made a pudding whoopsie';
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenseToEdit.id,
    update: { note }
  };
  const state = expensesReducer(expenses, action);
  expect(state[0]['note']).toBe(note);
});

test('should not edit an expense since it isn\'t found', () => {
  const note = 'oopsie doopsie i made a pudding whoopsie';
  const action = {
    type: 'EDIT_EXPENSE',
    id: 'fake',
    update: { note }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});

test('should remove an expense', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});
