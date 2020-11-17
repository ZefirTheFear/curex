import React, { useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";

import Header from "./components/Header/Header";
import MenuMobile from "./components/MenuMobile/MenuMobile";
import Hero from "./components/Hero/Hero";
import WhyUs from "./components/WhyUs/WhyUs";

import "./App.scss";

const App: React.FC = () => {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <div className="app">
      <Header />
      <MenuMobile />
      <Hero />
      <WhyUs />
    </div>
  );
};

export default App;
