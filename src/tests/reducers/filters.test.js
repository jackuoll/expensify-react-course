import filterReducer from '../../reducers/filters'
import moment from 'moment';

test('should setup default filter values', () => {
  const state = filterReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('Set sort by amount', () => {
  const state = filterReducer(undefined, { type: 'SORT_BY', sortBy: 'amount'});
  expect(state.sortBy).toBe('amount');
});

test('Set sort by date', () => {
  const curState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const state = filterReducer(curState, { type: 'SORT_BY', sortBy: 'date'});
  expect(state.sortBy).toBe('date');
});

test('Set the text filter', () => {
  const state = filterReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'stuff'});
  expect(state.text).toBe('stuff');
});

test('Set the startDate filter', () => {
  const state = filterReducer(undefined, { type: 'SET_START_DATE', startDate: 5});
  expect(state.startDate).toBe(5);
});

test('Set the endDate filter', () => {
  const state = filterReducer(undefined, { type: 'SET_END_DATE', endDate: 15});
  expect(state.endDate).toBe(15);
});
