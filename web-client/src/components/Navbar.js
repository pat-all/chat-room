import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='blue-grey'>
      <div className='nav-wrapper'>
        <Link to='/' className='brand-logo'>
          Chat Room
        </Link>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <Link to='/authorization'>Authorization</Link>
          </li>
          <li>
            <Link to={"/messages"}>Messages</Link>
          </li>
          <li>
            <Link to='/'>Documentation</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
