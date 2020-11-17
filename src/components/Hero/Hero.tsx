import React from "react";

import "./Hero.scss";

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__text">
          <h4>4k group</h4>
          <p>Ваш надежный партнер в обменных операциях</p>
        </div>
      </div>
      <button className="hero__btn">Оформить заявку</button>
    </section>
    //    <section className="hero">
    //    <div className="hero__inner">
    //      <div className="hero__text">
    //        <h4>Exchange</h4>
    //        <p>Powered by CRO, with Deep Liquidity, Low Fees and Best Execution Prices</p>
    //      </div>
    //      <div className="hero__img" />
    //    </div>
    //  </section>
  );
};

export default Hero;
