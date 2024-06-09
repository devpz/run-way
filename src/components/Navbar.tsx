import React from "react";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/user/userSlice";
import { RootState } from "../store";

const Img = styled.img`
  height: 2.5rem;
  width: auto;
`;

const StyledLogo = styled.div`
  text-align: center;
`;

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const src = "././logo.png";

  const numItemsInCart = useSelector(
    (state: RootState) => state.cartState.numItemsInCart
  );
  const theme = useSelector((state: RootState) => state.userState.theme);
  const isDarkTheme = theme === "customDark";

  return (
    <nav className="bg-base-200 bg-opacity-50 backdrop-blur-lg sticky top-0 z-50">
      <div className="navbar align-element">
        <div className="navbar-start">
          <NavLink to="/">
            <StyledLogo>
              <Img src={src} alt="Logo" />
            </StyledLogo>
          </NavLink>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-2">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={handleTheme}
              defaultChecked={isDarkTheme}
            />
            <BsSunFill className="swap-on h-4 w-4" />
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {numItemsInCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
