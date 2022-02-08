import React from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.css";

function Sidebar() {
  return <aside>
    <nav>
      <ul>
        <Link to={'/'}>Dashboard</Link>
        <Link to={'/goods'}>Goods</Link>
        <Link to={'/sales'}>Sales</Link>
        <Link to={'/users'}>Users</Link>
      </ul>
    </nav>
    <div className='logout'>
      <Link to={'#'}>Logout</Link>
    </div>
  </aside>;
}

export default Sidebar;
