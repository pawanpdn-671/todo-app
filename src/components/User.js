import React from 'react';
import logo from '../img/logo.png';

function User() {
   return (
      <div className="User">
         <div className="logo">
            <img src={logo} alt="logo" />
            <p>To-Do App</p>
         </div>

         <div className="info">
            <a href="/">Logout</a>
         </div>
      </div>
   )
}

export default User;