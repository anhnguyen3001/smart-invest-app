import React from "react";
import { useTranslation } from "react-i18next";
import { CandleStickChart, Text } from "src/components";
import { tradingPrices } from "src/mock";
import { IPrice } from "src/types";
import useSWR from "swr";
import { TradingDataTable } from "./TradingDataTable";

interface TradingDataProps {
  id: string;
}

// Format: [time, o, h, l, c]
const data: Array<any> = [
  [1538856000000, 6593.34, 6600, 6582.63, 6600],
  [1538856900000, 6595.16, 6604.76, 6590.73, 6593.86],
];

export const TradingData: React.FC<TradingDataProps> = ({ id }) => {
  const { t } = useTranslation();
  const { data: priceData } = useSWR(["prices", id], async () => {
    return tradingPrices;
  });

  return (
    <>
      <CandleStickChart data={data} />
      <Text level={1} fontWeight={700} className="my-base">
        {t("TradingData")}
      </Text>
      <TradingDataTable prices={priceData as IPrice[]} />
    </>
  );
};
