import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import navItemsFn from "../../utils/ts/navItems";

import { RootState } from "../../store/store";

import "./MenuMobile.scss";

const MenuMobile: React.FC = () => {
  const dispatch = useDispatch();

  const isMobileMenuOpen = useSelector((state: RootState) => state.mobileMenuState.isOpen);

  const navItems = useMemo(() => {
    return navItemsFn(dispatch);
  }, [dispatch]);

  return (
    <nav className="menu-mobile">
      {navItems.map((item) => (
        <div
          className={"menu-mobile__item" + (isMobileMenuOpen ? " menu-mobile__item_open" : "")}
          onClick={item.onClick}
          key={item.title}
        >
          {item.title}
        </div>
      ))}
    </nav>
  );
};

export default MenuMobile;
