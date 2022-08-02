import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useQuery, useTickers } from 'src/hooks';
import { GetTickersParams } from 'src/types';
import { TickerList } from './components';

export const Search: React.FC = () => {
  const query = useQuery();
  const q = query.get('q') || undefined;

  const [tickerParams, setTickerParams] = useState<GetTickersParams>({
    search: q,
  });

  useEffect(() => {
    setTickerParams((prev) => ({ ...prev, search: q }));
  }, [q]);

  const {
    isLoading: tickerLoading,
    pagination,
    tickers,
  } = useTickers(tickerParams);

  return (
    <div className="container">
      <h2 className="mb-16">{t('Search')}</h2>
      <TickerList
        tickers={tickers}
        pagination={pagination}
        onChangePagination={(page, pageSize) =>
          setTickerParams({ ...tickerParams, page, pageSize })
        }
        loading={tickerLoading}
      />
    </div>
  );
};
