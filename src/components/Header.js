import React from 'react';
import '../styles/Header.scss';

const Header = () => {
  return (
    <div className="header-container">
      <img src="../../images/noteWorx.png" alt='logo' className='logo'/>
      <div className="title">
        NoteWorx
      </div>
    </div>
  );
}

export default Header;