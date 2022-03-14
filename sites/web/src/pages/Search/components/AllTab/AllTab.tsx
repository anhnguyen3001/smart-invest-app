import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { InfiniteNewListProps, InfiniteNewList } from 'src/components';
import { TickerList, TickerListProps } from '../TickerList';
import { SectionTitle } from './SectionTitle';

interface AllTabProps {
  tickerListProps: TickerListProps;
  newsListProps: InfiniteNewListProps;
  onShowMoreTicker: () => void;
  onShowMoreNews: () => void;
}

export const AllTab: React.FC<AllTabProps> = ({
  tickerListProps,
  newsListProps,
  onShowMoreTicker,
  onShowMoreNews,
}) => {
  const { t } = useTranslation();

  const showedTickers = useMemo(() => {
    return tickerListProps.tickers?.slice(0, 6);
    // eslint-disable-next-line
  }, [JSON.stringify(tickerListProps.tickers)]);
  const showedNews = useMemo(() => {
    return newsListProps.news?.slice(0, 4);
    // eslint-disable-next-line
  }, [JSON.stringify(newsListProps.news)]);

  return (
    <>
      <SectionTitle title={t('Tickers')} onShowMore={onShowMoreTicker} />
      <TickerList
        {...tickerListProps}
        tickers={showedTickers}
        hasMore={false}
      />

      <SectionTitle
        className="pt-32"
        title={t('News')}
        onShowMore={onShowMoreNews}
      />
      <InfiniteNewList {...newsListProps} news={showedNews} hasMore={false} />
    </>
  );
};
