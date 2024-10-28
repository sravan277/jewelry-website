import React from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";
import Image from "next/image";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import { HomeNewArrivalPrdLoader } from "@/components/loader";
import ErrorMsg from "@/components/common/error-msg";


// Internal image imports
import insta_1 from '@assets/img/instagram/4/instagram-1.jpg';
import insta_3 from '@assets/img/instagram/4/instagram-3.jpg';
import insta_4 from '@assets/img/instagram/4/instagram-4.jpg';
import insta_6 from '@assets/img/instagram/4/instagram-6.jpg';

// Instagram data
const instagram_data = [
  { id: 1, link: 'https://www.instagram.com/', img: insta_1 },
  { id: 2, link: 'https://www.instagram.com/', img: insta_3 },
  { id: 3, link: 'https://www.instagram.com/', img: insta_4 },
  { id: 4, link: 'https://www.instagram.com/', img: insta_6 },
];

// Define additional user menu data
const user_menu_data = [
  { id: 'login', title: 'Login', link: '/login' },
  { id: 'register', title: 'Register', link: '/register' },
  { id: 'forgot-password', title: 'Forgot Password', link: '/forgot-password' },
  { id: 'my-account', title: 'My Account', link: '/my-account' },
];

const Menus = () => {
  const { data: products, isError, isLoading } = useGetProductTypeQuery({
    type: 'electronics',
    query: 'new=true'
  });
  
  // Decide what to render
  let content = null;
  
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  
  if (!isLoading && !isError && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  
  if (!isLoading && !isError && products?.data?.length > 0) {
    const product_items = products.data;
  
    content = (
      <div className="row">
        {product_items.slice(0, 4).map((item) => (
          <div key={item._id} className="col-md-3">
            <ProductItem product={item} />
          </div>
        ))}
      </div>
    );
  } else {
    content = [];
  }

  return (
    <ul>
      {menu_data.map((menu) => {
        if (menu.title.toLowerCase() === 'shop' || menu.title.toLowerCase() === 'coupons') {
          return null;
        }
        
        return menu.homes ? (
          <li key={menu.id} className="has-dropdown has-mega-menu">
            <Link href={menu.link}>{menu.title}</Link>
          </li>
        ) : menu.products ? null : (
          <li key={menu.id} className={menu.sub_menu ? "has-dropdown" : ""}>
            <Link href={menu.link}>{menu.title}</Link>
            {menu.sub_menu && (
              <ul className="tp-submenu">
                {menu.sub_menus.map((b, i) => (
                  <li key={i}>
                    <Link href={b.link}>{b.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
      
      {/* User Account Dropdown Menu */}
      <li className="has-dropdown">
        <Link href="#">Account</Link>
        <ul className="tp-submenu">
          {user_menu_data.map((userMenu) => (
            <li key={userMenu.id}>
              <Link href={userMenu.link}>{userMenu.title}</Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default Menus;
