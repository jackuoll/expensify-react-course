import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expensesTotal';

export const ExpensesSummary = (props) => {
  const quantity = props.expenses.length;
  const expenseWording = quantity === 1 ? 'expense' : 'expenses';
  const totalCost = numeral(getExpensesTotal(props.expenses) / 100).format('$0,0.00');
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <span>{quantity}</span> {expenseWording} totalling <span>{totalCost}</span>.</h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpensesSummary);
