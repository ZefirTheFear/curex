import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../Spinner/Spinner";
import Modal from "../Modal/Modal";
import { ReactComponent as SWWImg } from "../../assets/errorImgs/client-server-error.svg";
import FiatCalculator from "../FiatCalculator/FiatCalculator";
import CryptoCalculator from "../CryptoCalculator/CryptoCalculator";

import { scrollToNode } from "../../utils/ts/helperFunctions";

import ImgBTC from "../../assets/currenciesLogo/BTC.png";
import ImgETH from "../../assets/currenciesLogo/ETH.png";
import ImgUSDT from "../../assets/currenciesLogo/USDT.png";
import ImgXRP from "../../assets/currenciesLogo/XRP.png";
import ImgLTC from "../../assets/currenciesLogo/LTC.png";
import ImgXMR from "../../assets/currenciesLogo/XMR.png";
import ImgTRX from "../../assets/currenciesLogo/TRX.png";
import ImgDASH from "../../assets/currenciesLogo/DASH.png";
import ImgUSD from "../../assets/currenciesLogo/USD.png";
import ImgEUR from "../../assets/currenciesLogo/EUR.png";
import ImgUAH from "../../assets/currenciesLogo/UAH.png";

import { Currency } from "../../models/currency";

import { RootState } from "../../store/store";
import * as fiatCurrencyActions from "../../store/actions/fiatCurrenciesActions/fiatCurrenciesActionCreators";
import * as cryptoCurrencyActions from "../../store/actions/cryptoCurrencyActions/cryptoCurrencyActionCreators";

import "./Calculator.scss";

type calculatorTypes = "fiat" | "crypto";

const Calculator: React.FC = () => {
  const dispatch = useDispatch();

  const сalcSection = useRef<HTMLElement>(null!);

  const scrollToCalc = useSelector((state: RootState) => state.scrollState.scrollToCalc);

  const [calculatorType, setCalculatorType] = useState<calculatorTypes>("fiat");

  const [isFetchingBinanceData, setIsFetchingBinanceData] = useState(true);
  const [isFetchingOwnData, setIsFetchingOwnData] = useState(true);
  const [isSomethingWentWrong, setIsSomethingWentWrong] = useState(false);

  const fetchBinanceData = useCallback(async () => {
    try {
      const response = await fetch("https://apiv2.bitcoinaverage.com/exchanges/ticker/binance", {
        headers: {
          "x-ba-key": "MjY4ZmJkNGFiNzJkNDJjNzg4NjkwNDE5NzE2NDMxZGU"
        }
      });
      if (response.status !== 200) {
        return setIsSomethingWentWrong(true);
      }
      let resData: {
        symbols: {
          BTCUSDT: { bid: number };
          ETHUSDT: { bid: number };
          XRPUSDT: { bid: number };
          LTCUSDT: { bid: number };
          XMRUSDT: { bid: number };
          TRXUSDT: { bid: number };
          DASHUSDT: { bid: number };
        };
      } = await response.json();
      console.log(resData);
      const newCurrenciesFromCustomer: Currency[] = [
        {
          name: "BTC",
          valueBuy: resData.symbols.BTCUSDT.bid,
          valueSale: resData.symbols.BTCUSDT.bid,
          img: ImgBTC
        },
        {
          name: "ETH",
          valueSale: resData.symbols.ETHUSDT.bid,
          valueBuy: resData.symbols.ETHUSDT.bid,
          img: ImgETH
        },
        {
          name: "USDT",
          valueSale: 1,
          valueBuy: 1,
          img: ImgUSDT
        },
        {
          name: "XRP",
          valueSale: resData.symbols.XRPUSDT.bid,
          valueBuy: resData.symbols.XRPUSDT.bid,
          img: ImgXRP
        },
        {
          name: "LTC",
          valueSale: resData.symbols.LTCUSDT.bid,
          valueBuy: resData.symbols.LTCUSDT.bid,
          img: ImgLTC
        },
        {
          name: "XMR",
          valueSale: resData.symbols.XMRUSDT.bid,
          valueBuy: resData.symbols.XMRUSDT.bid,
          img: ImgXMR
        },
        {
          name: "TRX",
          valueSale: resData.symbols.TRXUSDT.bid,
          valueBuy: resData.symbols.TRXUSDT.bid,
          img: ImgTRX
        },
        {
          name: "DASH",
          valueSale: resData.symbols.DASHUSDT.bid,
          valueBuy: resData.symbols.DASHUSDT.bid,
          img: ImgDASH
        }
      ];
      dispatch(cryptoCurrencyActions.setCurrenciesFromCustomer(newCurrenciesFromCustomer));
      dispatch(
        cryptoCurrencyActions.setCurrentCurrencyFromCustomer({
          name: "BTC",
          img: ImgBTC,
          valueSale: resData.symbols.BTCUSDT.bid,
          valueBuy: resData.symbols.BTCUSDT.bid
        })
      );
      setIsFetchingBinanceData(false);
    } catch (error) {
      return setIsSomethingWentWrong(true);
    }
  }, [dispatch]);

  const fetchOwnData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://exchange-currencies-obolon.firebaseio.com/currencies.json`
      );
      if (response.status !== 200) {
        return setIsSomethingWentWrong(true);
      }
      let resData: {
        cryptoPercentages: {};
        usd: { buy: { rate: number }; sell: { rate: number } };
        eur: { buy: { rate: number }; sell: { rate: number } };
      } = await response.json();
      console.log(resData);
      const newCryptoCurrenciesToCustomer: Currency[] = [
        {
          name: "USD",
          valueSale: 1,
          valueBuy: 1,
          img: ImgUSD
        },
        {
          name: "EUR",
          valueSale: resData.eur.sell.rate / resData.usd.buy.rate,
          valueBuy: resData.eur.buy.rate / resData.usd.sell.rate,
          img: ImgEUR
        },
        {
          name: "UAH",
          valueSale: 1 / resData.usd.buy.rate,
          valueBuy: 1 / resData.usd.sell.rate,
          img: ImgUAH
        }
      ];

      const newFiatCurrencies: Currency[] = [
        {
          name: "USD",
          valueSale: resData.usd.sell.rate,
          valueBuy: resData.usd.buy.rate,
          img: ImgUSD
        },
        {
          name: "EUR",
          valueSale: resData.eur.sell.rate,
          valueBuy: resData.eur.buy.rate,
          img: ImgEUR
        },
        {
          name: "UAH",
          valueSale: 1,
          valueBuy: 1,
          img: ImgUAH
        }
      ];

      dispatch(fiatCurrencyActions.setFiatCurrenciesFromCustomer(newFiatCurrencies));
      dispatch(fiatCurrencyActions.setFiatCurrenciesToCustomer(newFiatCurrencies));
      dispatch(
        fiatCurrencyActions.setCurrentFiatCurrencyFromCustomer({
          name: "USD",
          valueSale: resData.usd.sell.rate,
          valueBuy: resData.usd.buy.rate,
          img: ImgUSD
        })
      );
      dispatch(
        fiatCurrencyActions.setCurrentFiatCurrencyToCustomer({
          name: "UAH",
          valueSale: 1,
          valueBuy: 1,
          img: ImgUAH
        })
      );

      dispatch(cryptoCurrencyActions.setCurrenciesToCustomer(newCryptoCurrenciesToCustomer));
      dispatch(
        cryptoCurrencyActions.setCurrentCurrencyToCustomer({
          name: "USD",
          img: ImgUSD,
          valueSale: 1,
          valueBuy: 1
        })
      );
      dispatch(cryptoCurrencyActions.setPercentages(Object.values(resData.cryptoPercentages)));
      setIsFetchingOwnData(false);
    } catch (error) {
      return setIsSomethingWentWrong(true);
    }
  }, [dispatch]);

  const toggleCalculatorType = useCallback(() => {
    setCalculatorType((prevState) => {
      if (prevState === "fiat") {
        return "crypto";
      } else {
        return "fiat";
      }
    });
  }, []);

  const closeSWWModal = useCallback(() => {
    setIsSomethingWentWrong(false);
  }, []);

  useEffect(() => {
    fetchBinanceData();
    fetchOwnData();
  }, [fetchBinanceData, fetchOwnData]);

  useEffect(() => {
    if (сalcSection.current) {
      scrollToNode(сalcSection.current);
    }
  }, [scrollToCalc]);

  if (isFetchingBinanceData || isFetchingOwnData) {
    return <Spinner />;
  }

  return (
    <>
      {/* {(isFetchingBinanceData || isFetchingOwnData) && <Spinner />} */}
      {isSomethingWentWrong && (
        <Modal
          Img={SWWImg}
          closeModal={closeSWWModal}
          msg={"что-то пошло не так. попробуйте еще раз"}
        />
      )}
      <section className="calculator-section" ref={сalcSection}>
        <div className="calculator-section__inner">
          <div className="calculator-section__calculator">
            {calculatorType === "fiat" ? <FiatCalculator /> : <CryptoCalculator />}
          </div>
          <div className="calculator-section__btn-group">
            <button
              className="calculator-section__toggle-type-btn"
              type="button"
              onClick={toggleCalculatorType}
            >
              перейти в {calculatorType === "fiat" ? "криптокалькулятор" : "фиатный калькулятор"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Calculator;
