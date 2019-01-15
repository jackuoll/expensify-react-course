import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('test that a single expense renders correctly', () => {
  const rendered = shallow(<ExpensesSummary expenses={[expenses[0]]} />);
  expect(rendered).toMatchSnapshot();
});

test('test that some expenses render correctly', () => {
  const rendered = shallow(<ExpensesSummary expenses={expenses} />);
  expect(rendered).toMatchSnapshot();
});
