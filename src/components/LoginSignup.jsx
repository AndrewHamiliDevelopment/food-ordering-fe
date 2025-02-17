import React from 'react';
import { Link } from 'react-router-dom';

function LoginSignup() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Login or Signup</h2>
      <button style={{ margin: '10px', padding: '10px' }}>
        <Link to="/login">Login</Link>
      </button>
      <button style={{ margin: '10px', padding: '10px' }}>
        <Link to="/signup">Signup</Link>
      </button>
    </div>
  );
}

export default LoginSignup;