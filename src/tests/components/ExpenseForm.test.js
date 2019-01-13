import React from 'react';
import moment from 'moment';
import {shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('Render the expense form with defaults', () => {
  const rendered = shallow(<ExpenseForm />);
  expect(rendered).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
  const rendered = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(rendered).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('form').simulate('submit', {preventDefault: () => {}});
  expect(wrapper.state('error')).toBe(true);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = "new desc";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {target: {value}});
  expect(wrapper.state('description')).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('should match note on textfield', () => {
  const value = 'my special note';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {target: {value}});
  expect(wrapper.state('note')).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('should set amount if valid input', () => {
  const value = '12.22';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {target: {value}});
  expect(wrapper.state('amount')).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('should not set amount if invalid input', () => {
  const value = '12.222';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {target: {value}});
  expect(wrapper.state('amount')).toBe('');
  expect(wrapper).toMatchSnapshot();
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(onSubmitSpy).toHaveBeenCalledWith({
    description: expenses[0].description,
    note: expenses[0].note,
    amount: expenses[0].amount,
    createdAt: expenses[0].createdAt,
  });
});

test('test should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('test calendar focuses when onFocusChange called', () => {
  const wrapper = shallow(<ExpenseForm />);
  const singleDatePicker = wrapper.find('SingleDatePicker');
  singleDatePicker.prop('onFocusChange')({ focused: true });
  expect(wrapper.state('calendarFocused')).toEqual(true);
  singleDatePicker.prop('onFocusChange')({ focused: false });
  expect(wrapper.state('calendarFocused')).toEqual(false);
});