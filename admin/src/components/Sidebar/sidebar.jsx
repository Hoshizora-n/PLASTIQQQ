import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return <div>
    <ul>
      <Link to={'/'}>Dashboard</Link>
      <Link to={'/goods'}>Goods</Link>
    </ul>
  </div>;
}

export default Sidebar;
