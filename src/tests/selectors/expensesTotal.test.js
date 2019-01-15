import expenses from '../fixtures/expenses';
import expensesTotal from '../../selectors/expensesTotal';

test('no expenses costs 0', () => {
  const total = expensesTotal([]);
  expect(total).toBe(0);
});

test('single expense total costs it\'s own value', () => {
  const total = expensesTotal(expenses.slice(0, 1));
  expect(total).toBe(expenses[0].amount);
});

test('test fixture expenses add up to expected amount', () => {
  const total = expensesTotal(expenses);
  expect(total).toBe(133511);
});
