import { Card } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { useTranslation } from "react-i18next";
import { getPriceColor } from "src/helpers/ticker";
import { ConvertedTicker } from "src/types";
import styles from "./ExchangeSummary.module.scss";
import { Text } from "src/components";

const cx = classNames.bind(styles);

interface ExchangeSummaryProps {
  ticker?: ConvertedTicker;
}

export const ExchangeSummary: React.FC<ExchangeSummaryProps> = ({
  ticker = {},
}) => {
  const { t } = useTranslation();

  const {
    openPrice,
    ceilingPrice,
    closePrice,
    floorPrice,
    minPrice,
    maxPrice,
    totalValue,
  } = ticker;

  const handleGetColor = (price?: number) => {
    return getPriceColor({ price, openPrice, ceilingPrice, floorPrice });
  };

  const displayTexts: { title: string; value?: number; colorClass?: string }[] =
    [
      {
        title: t("TotalValue"),
        value: totalValue,
      },
      {
        title: t("CeilingPrice"),
        value: ceilingPrice,
        colorClass: "ceil-color",
      },
      {
        title: t("FloorPrice"),
        value: floorPrice,
        colorClass: "floor-color",
      },
      {
        title: t("OpenPrice"),
        value: openPrice,
        colorClass: handleGetColor(openPrice),
      },
      {
        title: t("ClosePrice"),
        value: closePrice,
        colorClass: handleGetColor(closePrice),
      },
      {
        title: t("MinPrice"),
        value: minPrice,
        colorClass: handleGetColor(minPrice),
      },
      {
        title: t("MaxPrice"),
        value: maxPrice,
        colorClass: handleGetColor(maxPrice),
      },
    ];

  return (
    <Card
      className={cx("h-100")}
      bodyStyle={{
        padding: "16px 32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {displayTexts.map(({ title, value, colorClass }, index) => (
        <div
          key={index}
          className={cx(
            "d-flex",
            "justify-content-between",
            "align-items-center",
            { "mb-base": index !== displayTexts.length - 1 }
          )}
        >
          <Text level={2} fontWeight={500}>
            {title}
          </Text>
          <Text className={colorClass} level={1} fontWeight={700}>
            {value || "N/A"}
          </Text>
        </div>
      ))}
    </Card>
  );
};
