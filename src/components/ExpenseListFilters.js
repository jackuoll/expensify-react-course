import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };
  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(()=> ({ calendarFocused }));
  };
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortSelectChange = (e) => {
    if (e.target.value === "date"){
      this.props.sortByDate();
    } else if (e.target.value === "amount") {
      this.props.sortByAmount();
    }
  };
  render() {
    return (
      <div>
        <input type="text" defaultValue={this.props.filters.text} onChange={this.onTextChange} />
        <select defaultValue={this.props.filters.sortBy} onChange={this.onSortSelectChange}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates={false}
          numberOfMonths={1}
          isOutsideRange={() => false}
          minimumNights={0}
        />
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (value) => dispatch(setTextFilter(value)),
  sortByAmount: () => dispatch(sortByAmount()),
  sortByDate: () => dispatch(sortByDate()),
  setStartDate: (value) => dispatch(setStartDate(value)),
  setEndDate: (value) => dispatch(setEndDate(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
