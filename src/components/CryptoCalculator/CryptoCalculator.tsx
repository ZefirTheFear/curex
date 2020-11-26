import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { TiArrowRepeat } from "react-icons/ti";

import ExchangeData from "../ExchangeData/ExchangeData";
import TableForCryptoCalc from "../CryptoCalculatorTable/CryptoCalculatorTable";

import { RootState } from "../../store/store";
import * as cryptoCurrencyActions from "../../store/actions/cryptoCurrencyActions/cryptoCurrencyActionCreators";

import "./CryptoCalculator.scss";

const CryptoCalculator: React.FC = () => {
  const dispatch = useDispatch();

  const currenciesFromCustomer = useSelector(
    (state: RootState) => state.cryptoCurrenciesState.currenciesFromCustomer
  );
  const currenciesToCustomer = useSelector(
    (state: RootState) => state.cryptoCurrenciesState.currenciesToCustomer
  );
  const currentCurrencyFromCustomer = useSelector(
    (state: RootState) => state.cryptoCurrenciesState.currentCurrencyFromCustomer
  );
  const currentCurrencyToCustomer = useSelector(
    (state: RootState) => state.cryptoCurrenciesState.currentCurrencyToCustomer
  );
  const currencyFromCustomerAmount = useSelector(
    (state: RootState) => state.cryptoCurrenciesState.currencyFromCustomerAmount
  );
  const currencyToCustomerAmount = useSelector(
    (state: RootState) => state.cryptoCurrenciesState.currencyToCustomerAmount
  );

  const changeCurrencyFromCustomerAmount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(cryptoCurrencyActions.changeCurrencyFromCustomerAmount(event.currentTarget.value));
    },
    [dispatch]
  );

  const changeCurrencyToCustomerAmount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(cryptoCurrencyActions.changeCurrencyToCustomerAmount(event.currentTarget.value));
    },
    [dispatch]
  );

  const swapCurrencies = useCallback(() => {
    dispatch(cryptoCurrencyActions.swapCurrencies());
  }, [dispatch]);

  return (
    <>
      <div className="crypto-calculator">
        <div className="crypto-calculator__desc">
          <p>
            Воспользуйтесь нашим калькулятором для предварительного расчета результата операции.
            Из-за высокой волатильности рынка мы не можем фиксировать котировки той или иной валюты.
            Окончательная стоимость берется с биржи непосредственно в момент проведения операции.
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
        <TableForCryptoCalc />
      </div>
    </>
  );
};

export default CryptoCalculator;
