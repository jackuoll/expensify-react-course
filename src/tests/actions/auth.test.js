import { login, logout } from '../../actions/auth';

test('should log in', () => {
  const uid = 'jack';
  expect(login(uid)).toEqual({
    type: 'LOGIN',
    uid
  })
});

test('should set up log out action', () => {
  expect(logout()).toEqual({
    type: 'LOGOUT'
  });
})