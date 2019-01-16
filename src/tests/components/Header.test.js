import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render output correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  const startLogout = jest.fn();
  const page = shallow(<Header startLogout={startLogout} />);
  page.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});
