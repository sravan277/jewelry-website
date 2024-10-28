import React from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";

// Define additional user menu data
const user_menu_data = [
  { id: 'login', title: 'Login', link: '/login' },
  { id: 'register', title: 'Register', link: '/register' },
  { id: 'forgot-password', title: 'Forgot Password', link: '/forgot-password' },
  { id: 'my-account', title: 'My Account', link: '/my-account' },
];

// Render submenu items
const renderSubMenu = (subMenus) => (
  <ul className="tp-submenu">
    {subMenus.map((subMenu, index) => (
      <li key={index}>
        <Link href={subMenu.link}>{subMenu.title}</Link>
      </li>
    ))}
  </ul>
);

// Render main menu items
const renderMenuItem = (menu) => {
  if (menu.title.toLowerCase() === 'shop' || menu.title.toLowerCase() === 'coupons') {
    return null;
  }

  // Remove dropdown for Home and Blog
  const hasDropdown = menu.sub_menu && menu.title.toLowerCase() !== 'home' && menu.title.toLowerCase() !== 'blog';

  return menu.homes ? (
    <li key={menu.id}>
      <Link href={menu.link}>{menu.title}</Link>
    </li>
  ) : menu.products ? null : (
    <li key={menu.id} className={hasDropdown ? "has-dropdown" : ""}>
      <Link href={menu.link}>{menu.title}</Link>
      {hasDropdown && renderSubMenu(menu.sub_menus)}
    </li>
  );
};

// Render user menu dropdown
const renderUserMenu = () => (
  <li className="has-dropdown">
    <Link href="#">Account</Link>
    {renderSubMenu(user_menu_data)}
  </li>
);

const Menus = () => {
  return (
    <ul>
      {menu_data.map((menu) => renderMenuItem(menu))}
      {renderUserMenu()}
    </ul>
  );
};

export default Menus;
