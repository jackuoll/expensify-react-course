import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper, expense;
beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  expense = expenses[2];
  wrapper = shallow(<EditExpensePage {...{history, editExpense, removeExpense, expense}}/>);
});


test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);
  expect(editExpense).toHaveBeenLastCalledWith('3', expense);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle removeExpense', () => {
  wrapper.find('button').prop('onClick')(expense);
  expect(removeExpense).toHaveBeenLastCalledWith(expense);
  expect(history.push).toHaveBeenLastCalledWith('/');
});