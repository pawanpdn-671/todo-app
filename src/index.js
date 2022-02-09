import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TodoContextProvider } from './context';

ReactDOM.render(
   <TodoContextProvider>
      <App />
   </TodoContextProvider>,
   document.querySelector('#root')
);
