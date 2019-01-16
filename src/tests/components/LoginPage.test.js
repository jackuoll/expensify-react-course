import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should render loginpage', () => {
  const page = shallow(<LoginPage />);
  expect(page).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
  const startLogin = jest.fn();
  const page = shallow(<LoginPage startLogin={startLogin} />);
  page.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});
