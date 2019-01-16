import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, startEditExpense, removeExpense, 
  startRemoveExpense, startSetExpenses, setExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockstore = configureMockStore([thunk]);
const uid = "testuid";
const defaultAuthStore = { auth: { uid } };

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt}) => {
    expensesData[id] = {description, note, amount, createdAt}
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

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
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenses[2]
    }
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockstore(defaultAuthStore);
  const expenseData = {
    description: "Mouse",
    amount: 3000,
    note: "Needed it",
    createdAt: 5000
  };
  return store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense:{
        id: expect.any(String),
        ...expenseData
      }
    });
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with default to database and store', (done) => {
  const store = createMockstore(defaultAuthStore);
  const expectedDefault = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };
  return store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense:{
        id: expect.any(String),
        ...expectedDefault
      }
    });
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expectedDefault);
    done();
  });
});

test('Should set up setexpenses action object.', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockstore(defaultAuthStore);
  return store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

test('should remove an expense from firebase', (done) => {
  const store = createMockstore(defaultAuthStore);
  const expense = expenses[1];
  return store.dispatch(startRemoveExpense(expense)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id: expense.id
    });
    return database.ref(`users/${uid}/expenses/${expense.id}`).once('value');
  }).then((res) => {
    expect(res.val()).toBeFalsy();
    done();
  });
});

test('should update an expense on firebase', (done) => {
  const store = createMockstore(defaultAuthStore);
  const expense = expenses[0];
  const update = {note: "this is an updated note"};
  return store.dispatch(startEditExpense(expense.id, update)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id: expense.id,
      update
    });
    return database.ref(`users/${uid}/expenses/${expense.id}`).once('value');
  }).then((res) => {
    const val = res.val();
    expect(val.description).toBe("Gum");
    expect(val.note).toBe("this is an updated note");
    done();
  });
});

