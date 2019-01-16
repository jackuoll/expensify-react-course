import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses'

export class EditExpensePage extends React.Component {
  startRemoveExpense = () => {
    this.props.startRemoveExpense(this.props.expense);
    this.props.history.push('/dashboard');
  };
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/dashboard');
  };
  render() {
    return (
      <div>
        <h1>Editing {this.props.expense.description}</h1>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit} 
        />
        <button onClick={this.startRemoveExpense}>Remove</button>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  startRemoveExpense: (expense) => dispatch(startRemoveExpense(expense)),
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);