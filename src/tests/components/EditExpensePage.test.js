import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper, expense;
beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  expense = expenses[2];
  wrapper = shallow(<EditExpensePage {...{history, startEditExpense, startRemoveExpense, expense}}/>);
});


test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);
  expect(startEditExpense).toHaveBeenLastCalledWith('3', expense);
  expect(history.push).toHaveBeenLastCalledWith('/dashboard');
});

test('should handle startRemoveExpense', () => {
  wrapper.find('button').prop('onClick')(expense);
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expense);
  expect(history.push).toHaveBeenLastCalledWith('/dashboard');
});