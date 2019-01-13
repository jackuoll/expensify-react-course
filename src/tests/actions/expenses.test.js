import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Should set up remove expense action object.', () => {
  const action = removeExpense({ id: 'abc123' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 'abc123'
  });
});

test('Should set up edit expense action object.', () => {
  const action = editExpense('abc123', {note: 'My note!'});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'abc123',
    update: {
      note: 'My note!'
    }
  });
});

test('Should set up an add expense with specific values.', () => {
  const expenseData = {
    description: 'Spanner',
    note: 'Needed it',
    amount: 4999,
    createdAt: 1234567890
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('Should set up an add expense with default values.', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      amount: 0,
      createdAt: 0,
      description: '',
      note: '',
      id: expect.any(String)
    }
  });
});