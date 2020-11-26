import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FaAngleDown } from "react-icons/fa";

import { Currency } from "../../models/currency";
import { RootState } from "../../store/store";
import * as currencyActions from "../../store/actions/cryptoCurrencyActions/cryptoCurrencyActionCreators";

import "./ExchangeData.scss";

interface ExchangeDataProps {
  status: "sale" | "buy";
  title: string;
  options: Currency[];
  currentCurrency: Currency;
  value: string;
  onChangeInputAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExchangeData: React.FC<ExchangeDataProps> = ({
  status,
  title,
  options,
  currentCurrency,
  value,
  onChangeInputAmount
}) => {
  const dispatch = useDispatch();

  const closeOptions = useSelector((state: RootState) => state.cryptoCurrenciesState.closeOptions);

  const optionsListElem = useRef<HTMLDivElement>(null!);
  const selectedElem = useRef<HTMLDivElement>(null!);
  const isMount = useRef(false);

  const [isOpenedOptions, setIsOpenedOptions] = useState(false);

  const toggleIsOpenedOptions = useCallback(() => {
    const elem = optionsListElem.current;
    if (isOpenedOptions) {
      elem.style.borderWidth = "0";
      elem.style.marginTop = "";
      elem.style.height = "0";
    } else {
      const borderWidth = 1;
      elem.style.borderWidth = `${borderWidth}px`;
      elem.style.marginTop = "0.5rem";
      elem.style.height = elem.scrollHeight + borderWidth * 2 + "px";
    }

    setIsOpenedOptions((prevState) => !prevState);
  }, [isOpenedOptions]);

  const closeCurrenciesOptions = useCallback(() => {
    const elem = optionsListElem.current;
    elem.style.borderWidth = "0";
    elem.style.height = "0";
    elem.style.marginTop = "";
    setIsOpenedOptions(false);
  }, []);

  const selectCurrency = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const currencyName = e.currentTarget.getAttribute("data-name")!;
      const newSelectedCurrency = options.find((currency) => currency.name === currencyName)!;
      if (status === "buy") {
        dispatch(currencyActions.setCurrentCurrencyFromCustomer(newSelectedCurrency));
      } else {
        dispatch(currencyActions.setCurrentCurrencyToCustomer(newSelectedCurrency));
      }
      toggleIsOpenedOptions();
    },
    [dispatch, options, status, toggleIsOpenedOptions]
  );

  const closeOpenedOptions = useCallback(
    (e: MouseEvent) => {
      let element = e.target as HTMLElement;
      while (element !== document.body) {
        if (element === selectedElem.current) {
          return;
        }
        const parentElement = element.parentElement;
        if (parentElement) {
          element = parentElement;
        } else {
          return;
        }
      }
      if (isOpenedOptions) {
        closeCurrenciesOptions();
      }
    },
    [closeCurrenciesOptions, isOpenedOptions]
  );

  useEffect(() => {
    if (isMount.current) {
      closeCurrenciesOptions();
    }
    isMount.current = true;
  }, [closeOptions, closeCurrenciesOptions]);

  useEffect(() => {
    window.addEventListener("click", closeOpenedOptions);
    return () => {
      window.removeEventListener("click", closeOpenedOptions);
    };
  }, [closeOpenedOptions]);

  return (
    <div className="exchange-data">
      <div className="exchange-data__title">{title}</div>
      <div className="exchange-data__selector">
        <div className="exchange-data__selected" onClick={toggleIsOpenedOptions} ref={selectedElem}>
          <img
            className="exchange-data__currency-img"
            src={currentCurrency.img}
            alt={currentCurrency.name + "-logo"}
          />
          <span className="exchange-data__currency-name">{currentCurrency.name}</span>
          <span
            className={
              "exchange-data__select-arrow" +
              (isOpenedOptions ? " exchange-data__select-arrow_is-opened" : "")
            }
          >
            <FaAngleDown />
          </span>
        </div>
        <div className="exchange-data__select-options" ref={optionsListElem}>
          {options.map((item) => (
            <div
              className="exchange-data__select-options-item"
              key={item.name}
              data-name={item.name}
              onClick={selectCurrency}
            >
              <img
                className="exchange-data__currency-img"
                src={item.img}
                alt={item.name + "-logo"}
              />
              <span className="exchange-data__currency-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <input
        type="number"
        placeholder="0.00"
        className="exchange-data__input"
        value={value}
        onChange={onChangeInputAmount}
      />
    </div>
  );
};

export default ExchangeData;
