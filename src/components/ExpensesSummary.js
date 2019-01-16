import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expensesTotal';

export const ExpensesSummary = (props) => {
  const quantity = props.expenses.length;
  const expenseWording = quantity === 1 ? 'expense' : 'expenses';
  if (quantity === 0) {
    return null;
  }
  const totalCost = numeral(getExpensesTotal(props.expenses) / 100).format('$0,0.00');
  return (
    <div>
      <h1>Viewing {quantity} {expenseWording} totalling {totalCost}.</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpensesSummary);
