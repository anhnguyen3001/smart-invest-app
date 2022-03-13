import { ITicker } from '@ah-ticker/common';
import { Col, Row, Tabs } from 'antd';
import classNames from 'classnames/bind';
import { t } from 'i18next';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { convertTicker } from 'src/helpers';
import { mockCompany, mockTicker } from 'src/mock';
import useSWR from 'swr';
import {
  CompanyOverview,
  ExchangeSummary,
  PriceChart,
  TickerAnalysis,
  TickerInfo,
  TickerOverview,
  TradingData,
} from './components';
import styles from './Detail.module.scss';

const cx = classNames.bind(styles);

interface DetailParams {
  stockCode: string;
}

const stockExchangePercent = 7;

const CONTENT_TAB_KEY = {
  overview: 'overview',
  tradingData: 'tradingData',
  analysis: 'analysis',
};

export const Detail: React.FC = ({}) => {
  const { stockCode } = useParams<DetailParams>();
  const { data: tickerData } = useSWR([stockCode], async () => {
    return mockTicker;
  });
  const ticker = convertTicker(tickerData as ITicker, stockExchangePercent);

  const { data: companyData } = useSWR(['company', stockCode], async () => {
    return mockCompany;
  });

  const [activeTab, setActiveTab] = useState(CONTENT_TAB_KEY.overview);
  const onGoToAnalysisTab = useCallback(() => {
    setActiveTab(CONTENT_TAB_KEY.analysis);
    // eslint-disable-next-line
  }, []);

  const renderTabContent = () => {
    const tabs = [
      {
        tab: t('Overview'),
        key: CONTENT_TAB_KEY.overview,
        children: <TickerOverview onGoToAnalysisTab={onGoToAnalysisTab} />,
      },
      {
        tab: t('TradingData'),
        key: CONTENT_TAB_KEY.tradingData,
        children: <TradingData id={stockCode} />,
      },
      {
        tab: t('Analysis'),
        key: CONTENT_TAB_KEY.analysis,
        children: <TickerAnalysis id={stockCode} />,
      },
    ];

    return tabs.map((tabPanes) => <Tabs.TabPane {...tabPanes} />);
  };

  return (
    <>
      <TickerInfo ticker={ticker} />

      <Row
        justify="space-between"
        align="stretch"
        gutter={[32, 16]}
        className={cx('section')}
      >
        <Col md={16} xs={24}>
          <PriceChart name={stockCode} />
        </Col>
        <Col md={8} xs={24}>
          <ExchangeSummary ticker={ticker} />
        </Col>
      </Row>

      <div className={cx('section')}>
        <CompanyOverview company={companyData} />
      </div>

      <Tabs
        tabPosition="top"
        animated
        size="large"
        activeKey={activeTab}
        onTabClick={(key: string) => setActiveTab(key)}
        className={cx('section')}
      >
        {renderTabContent()}
      </Tabs>
    </>
  );
};
