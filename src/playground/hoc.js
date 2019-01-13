

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <p>hi</p>
    <p>you there -- {props.name}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      <p>This is private, please dont share</p>
      <WrappedComponent {...props}/>
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? <WrappedComponent {...props}/> : <p>Login please.</p>}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={true} name="Jilly"/>, document.getElementById('app'));