export interface Currency {
  name:
    | "BTC"
    | "ETH"
    | "USDT"
    | "XRP"
    | "LTC"
    | "XMR"
    | "TRX"
    | "DASH"
    | "USD"
    | "EUR"
    | "RUB"
    | "PLN"
    | "GBP"
    | "CHF"
    | "CAD"
    | "UAH";
  valueBuy: number;
  valueSale: number;
  img: string;
}
