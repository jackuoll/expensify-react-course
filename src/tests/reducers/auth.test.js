import authReducer from '../../reducers/auth';

test('should log in a user', () => {
  const loginAction = {
    type: 'LOGIN',
    uid: 'test'
  };
  const state = authReducer({}, loginAction);
  expect(state).toEqual({uid: loginAction.uid});
});

test('should log out a user', () => {
  let state = {uid: 'test'};
  const action = {type: 'LOGOUT'};
  state = authReducer(state, action);
  expect(state).toEqual({});
});
