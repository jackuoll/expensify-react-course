import moment from 'moment';

export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = isNaN(startDate) || createdAtMoment.isSameOrAfter(moment(startDate), 'day');
    const endDateMatch = isNaN(endDate) || createdAtMoment.isSameOrBefore(moment(endDate), 'day');
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy == 'date'){
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy == 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
    return 0;
  });
};
