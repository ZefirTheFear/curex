import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { TiArrowRepeat } from "react-icons/ti";

import Spinner from "../Spinner/Spinner";
import Modal from "../Modal/Modal";
import { ReactComponent as SWWImg } from "../../assets/errorImgs/client-server-error.svg";
import ExchangeData from "../ExchangeData/ExchangeData";
import TableForCalc from "../CalculatorTable/CalculatorTable";

import { Currency } from "../../models/currency";

import { RootState } from "../../store/store";
import * as currencyActions from "../../store/actions/currencyActions/currencyActionCreators";

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
import ImgUAH from "../../assets/currenciesLogo/UAH.png";

import "./Calculator.scss";

const Calculator: React.FC = () => {
  const dispatch = useDispatch();

  const calcSection = useRef<HTMLElement>(null!);

  const currenciesFromCustomer = useSelector(
    (state: RootState) => state.currenciesState.currenciesFromCustomer
  );
  const currenciesToCustomer = useSelector(
    (state: RootState) => state.currenciesState.currenciesToCustomer
  );
  const currentCurrencyFromCustomer = useSelector(
    (state: RootState) => state.currenciesState.currentCurrencyFromCustomer
  );
  const currentCurrencyToCustomer = useSelector(
    (state: RootState) => state.currenciesState.currentCurrencyToCustomer
  );
  const currencyFromCustomerAmount = useSelector(
    (state: RootState) => state.currenciesState.currencyFromCustomerAmount
  );
  const currencyToCustomerAmount = useSelector(
    (state: RootState) => state.currenciesState.currencyToCustomerAmount
  );

  const scrollToCalc = useSelector((state: RootState) => state.scrollState.scrollToCalc);

  const [isFetchingBinanceData, setIsFetchingBinanceData] = useState(true);
  const [isFetchingOwnData, setIsFetchingOwnData] = useState(true);
  const [isSomethingWentWrong, setIsSomethingWentWrong] = useState(false);

  const changeCurrencyFromCustomerAmount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(currencyActions.changeCurrencyFromCustomerAmount(event.currentTarget.value));
    },
    [dispatch]
  );

  const changeCurrencyToCustomerAmount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(currencyActions.changeCurrencyToCustomerAmount(event.currentTarget.value));
    },
    [dispatch]
  );

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
      dispatch(currencyActions.setCurrenciesFromCustomer(newCurrenciesFromCustomer));
      dispatch(
        currencyActions.setCurrentCurrencyFromCustomer({
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
      } = await response.json();
      console.log(resData);
      const newCurrenciesToCustomer: Currency[] = [
        {
          name: "USD",
          valueSale: 1,
          valueBuy: 1,
          img: ImgUSD
        },
        {
          name: "UAH",
          valueSale: 1 / resData.usd.buy.rate,
          valueBuy: 1 / resData.usd.sell.rate,
          img: ImgUAH
        }
      ];
      dispatch(currencyActions.setCurrenciesToCustomer(newCurrenciesToCustomer));
      dispatch(currencyActions.setPercentages(Object.values(resData.cryptoPercentages)));
      setIsFetchingOwnData(false);
    } catch (error) {
      return setIsSomethingWentWrong(true);
    }
  }, [dispatch]);

  const swapCurrencies = useCallback(() => {
    dispatch(currencyActions.swapCurrencies());
  }, [dispatch]);

  const closeSWWModal = useCallback(() => {
    setIsSomethingWentWrong(false);
  }, []);

  useEffect(() => {
    fetchBinanceData();
    fetchOwnData();
  }, [fetchBinanceData, fetchOwnData]);

  useEffect(() => {
    if (calcSection.current) {
      scrollToNode(calcSection.current);
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
      <section className="calculator-section" ref={calcSection}>
        <div className="calculator-section__inner">
          <div className="calculator__desc">
            <p>
              Воспользуйтесь нашим калькулятором для предварительного расчета результата операции.
              Из-за высокой волатильности рынка мы не можем фиксировать котировки той или иной
              валюты. Окончательная стоимость берется с биржи непосредственно в момент проведения
              операции.
            </p>
          </div>
          <div className="calculator">
            <ExchangeData
              status="buy"
              title="вы продаете"
              options={currenciesFromCustomer}
              currentCurrency={currentCurrencyFromCustomer}
              value={currencyFromCustomerAmount}
              onChangeInputAmount={changeCurrencyFromCustomerAmount}
            />
            <div className="calculator__swaper" onClick={swapCurrencies}>
              <TiArrowRepeat />
            </div>
            <ExchangeData
              status="sale"
              title="вы покупаете"
              options={currenciesToCustomer}
              currentCurrency={currentCurrencyToCustomer}
              value={currencyToCustomerAmount}
              onChangeInputAmount={changeCurrencyToCustomerAmount}
            />
          </div>
          {!(isFetchingBinanceData || isFetchingOwnData) && <TableForCalc />}
        </div>
      </section>
    </>
  );
};

export default Calculator;
