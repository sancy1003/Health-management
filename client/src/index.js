import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import loadUser from './components/auth/loadUser';

loadUser(); // 유저 로그인 상태 확인

ReactDOM.render(
  <App />,
document.getElementById("root")
);