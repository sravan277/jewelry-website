import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Search, Wishlist } from '@/svg';
import Menus from './header-com/menus';
import logo_white from '@assets/img/logo/logo-white.svg';
import logo_dark from '@assets/img/logo/logo.svg';
import useSticky from '@/hooks/use-sticky';
import SearchBar from './header-com/search-bar';
import OffCanvas from '@/components/common/off-canvas';
import { FaUser } from 'react-icons/fa'; // Import FaUser
import { useRouter } from 'next/router'; // Import useRouter

const HeaderFour = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { sticky } = useSticky();
  const quantity = 0; // Replace this with actual quantity from your state if needed

  const router = useRouter(); // Initialize the router

  // Function to handle account button click
  const handleAccountClick = () => {
    router.push('/profile');
  };

  return (
    <>
      <header>
        <div id="header-sticky" className={`tp-header-area tp-header-style-transparent-white tp-header-sticky tp-header-transparent has-dark-logo tp-header-height ${sticky ? 'header-sticky' : ''}`}>
          <div className="tp-header-bottom-3 pl-85 pr-85">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-6">
                  <div className="logo">
                    <Link href="/">
                      <Image className="logo-light" src={logo_white} alt="logo" />
                      <Image className="logo-dark" src={logo_dark} alt="logo" />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 d-none d-lg-block">
                  <div className="main-menu menu-style-3 menu-style-4 p-relative">
                    <nav className="tp-main-menu-content">
                      <Menus />
                    </nav>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-6">
                  <div className="tp-header-action d-flex align-items-center justify-content-end ml-50">

                    {/* Search Button */}
                    <div className="tp-header-action-item d-none d-sm-block">
                      <button onClick={() => setIsSearchOpen(true)} type="button" className="tp-header-action-btn tp-search-open-btn">
                        <Search />
                      </button>
                    </div>

                    {/* Wishlist Button */}
                    <div className="tp-header-action-item d-none d-sm-block">
                      <Link href="/wishlist" className="tp-header-action-btn">
                        <Wishlist />
                        <span className="tp-header-action-badge">{wishlist.length}</span>
                      </Link>
                    </div>

                    {/* User Account Button */}
                    <div className="tp-header-action-item d-none d-sm-block">
                      <button
                        onClick={handleAccountClick} // Navigate to profile on click
                        type="button"
                        className="tp-header-action-btn cartmini-open-btn"
                      >
                        <FaUser />
                      
                      </button>
                    </div>

                    {/* Offcanvas Menu Button */}
                    <div className="tp-header-action-item d-lg-none">
                      <button onClick={() => setIsCanvasOpen(true)} type="button" className="tp-offcanvas-open-btn">
                        <Menu />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search bar start */}
      <SearchBar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      <OffCanvas isOffCanvasOpen={isOffCanvasOpen} setIsCanvasOpen={setIsCanvasOpen} categoryType="jewelry" />
      {/* Off canvas end */}
    </>
  );
};

export default HeaderFour;
