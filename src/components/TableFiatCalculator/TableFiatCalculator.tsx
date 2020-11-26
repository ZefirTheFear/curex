import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

import "./TableFiatCalculator.scss";

const CalculatorTable: React.FC = () => {
  const currencies = useSelector(
    (state: RootState) => state.fiatCurrenciesState.currenciesFromCustomer
  );

  const headerTableCurrencies = useMemo(() => {
    return ["валюта", "покупка, грн", "продажа, грн"];
  }, []);

  return (
    <div className="calculator-tables">
      <div className="calculator-tables__table">
        <table>
          <thead>
            <tr>
              {headerTableCurrencies.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => {
              if (currency.name !== "UAH") {
                return (
                  <tr key={currency.name}>
                    <td>
                      <div>
                        <img src={currency.img} alt={currency.name + "-logo"} />
                        {currency.name}
                      </div>
                    </td>
                    <td>{currency.valueBuy}</td>
                    <td>{currency.valueSale}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
      {/* <div className="calculator-tables__table">
        <table>
          <thead>
            <tr>
              {headerTablePercentages.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {percentages.map((percentage) => (
              <tr key={percentage.amountFrom}>
                <td>
                  {percentage.amountFrom} - {percentage.amountTo}
                </td>
                <td>{formatValue(percentage.percentBuyCrypto)}</td>
                <td>{formatValue(percentage.percentSaleCrypto)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3}>
                от ${percentages[percentages.length - 1].amountTo + 1} индивидуальные условия
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default CalculatorTable;
