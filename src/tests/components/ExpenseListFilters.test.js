import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import filters from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;
beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters 
      filters={filters[0]}
      {...{setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate}} 
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with altfilters correctly', () => {
  wrapper.setProps({
    filters: filters[1]
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const e = {target: {value: 'Change'}};
  wrapper.find('input').at(0).prop('onChange')(e);
  expect(setTextFilter).toHaveBeenLastCalledWith(e.target.value);
});

test('should sort by date', () => {
  const e = {target: {value: 'date'}};
  wrapper.find('select').prop('onChange')(e);
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const e = {target: {value: 'amount'}};
  wrapper.find('select').prop('onChange')(e);
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate: 0, endDate: 1});
  expect(setStartDate).toHaveBeenLastCalledWith(0);
  expect(setEndDate).toHaveBeenLastCalledWith(1);
});

test('should handle date focus changes', () => {
  wrapper.find('DateRangePicker').prop('onFocusChange')('startDate');
  expect(wrapper.state('calendarFocused')).toBe('startDate');
});
