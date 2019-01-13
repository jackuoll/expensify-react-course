import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, removeExpense } from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import expenses from './tests/fixtures/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  console.log(getVisibleExpenses(state.expenses, state.filters));
});

expenses.forEach(expense => {
  store.dispatch(addExpense({
    ...expense,
    createdAt: moment().add(expenses.indexOf(expense), 'seconds').valueOf()
  }));  
});

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById('app'));
