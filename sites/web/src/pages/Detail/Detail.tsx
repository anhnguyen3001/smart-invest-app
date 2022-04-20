import { Company } from '@smart-invest/common';
import { Col, Row, Tabs } from 'antd';
import classNames from 'classnames/bind';
import { t } from 'i18next';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CommentSection,
  CompanyOverview,
  ExchangeSummary,
  PriceChart,
  TickerAnalysis,
  TickerInfo,
  TickerOverview,
  TradingData,
} from './components';
import styles from './Detail.module.scss';
import { useCompany } from './hooks';

const cx = classNames.bind(styles);

interface DetailParams {
  companyId: string;
}

const CONTENT_TAB_KEY = {
  overview: 'overview',
  tradingData: 'tradingData',
  analysis: 'analysis',
};

export const Detail: React.FC = () => {
  const { companyId } = useParams<DetailParams>();

  const { company, tickerPrice } = useCompany(companyId);
  const { companyId: id, symbol } = (company || {}) as Company;

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
        children: <TradingData symbol={symbol} />,
      },
      {
        tab: t('Analysis'),
        key: CONTENT_TAB_KEY.analysis,
        children: <TickerAnalysis companyId={id} />,
      },
    ];

    return tabs.map((tabPanes) => <Tabs.TabPane {...tabPanes} />);
  };

  return (
    <>
      <TickerInfo className={cx('section')} company={company} />

      <Row
        justify="space-between"
        align="stretch"
        gutter={32}
        className={cx('section')}
      >
        <Col lg={16} xs={24}>
          <PriceChart symbol={symbol} />
        </Col>
        <Col lg={8} xs={24}>
          <ExchangeSummary tickerPrice={tickerPrice} />
        </Col>
      </Row>

      <div className={cx('section', 'pt-32', 'pb-16')}>
        <CompanyOverview company={company} />
      </div>

      <Tabs
        tabPosition="top"
        animated
        size="large"
        activeKey={activeTab}
        onTabClick={(key: string) => setActiveTab(key)}
        className={cx('section', 'mb-16')}
      >
        {renderTabContent()}
      </Tabs>

      <CommentSection companyId={id} />
    </>
  );
};
