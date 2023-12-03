import React, { useState } from 'react';
import Logo from '../assets/images/logo.svg' 
import Cart from './Cart';
import Avatar from '../assets/images/image-avatar.png'
import MenuIcon from '../assets/images/icon-menu.svg'
import CloseIcon from '../assets/images/icon-close-orange.svg';

import './Nav.css';

const menuItems = [
  { name: 'Collections', link: '#' },
  { name: 'Men', link: '#' },
  { name: 'Women', link: '#' },
  { name: 'About', link: '#' },
  { name: 'Contact', link: '#' },
];

const Nav = ((params) => {

  /* mobile menu */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      <button onClick={() => setIsMenuOpen(x => !x)} className="menuBtn">
        {isMenuOpen ? <img src={CloseIcon} alt="Close" /> :
        <img src={MenuIcon} alt="Menu" /> }
      </button>
      <a href="#" className="logo"><img src={Logo} alt="Logo" /></a>
      <ul className={isMenuOpen ? "open" : ""}>
      {menuItems.map((item, index) =>
        <li key={index}><a href={item.link} onClick={() => setIsMenuOpen(false)}>{item.name}</a></li>
      )}
      </ul>
      <div className={isMenuOpen ? "bg open" : "bg"}></div>

      <div className="cart">
        <Cart store={params.store} />
        <img src={Avatar} className="avatarImg" alt="Avatar" />
      </div>
    </nav>
  );
});

export default Nav;
