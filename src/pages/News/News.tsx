import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CustomLoading,
  InfiniteNewList,
  TabContent,
  TabPaneProps,
} from 'src/components';
import { NEWS_PATH } from 'src/constants';
import { useInfiniteNews } from 'src/hooks';
import { useInfiniteFavoriteNews } from './hooks';

const TAB_KEY = {
  all: 'all',
  favoriteList: 'favoriteList',
};

export const News: React.FC = () => {
  const { t } = useTranslation();

  const {
    news,
    isLoading: newsLoading,
    hasMore: newsHasMore,
    isEmpty: newsIsEmpty,
    page: newsPage,
    setPage: setNewsPage,
  } = useInfiniteNews({ pageSize: 20 });

  const {
    news: favoriteNews,
    isLoading: favoriteNewsLoading,
    hasMore: favoriteNewsHasMore,
    isEmpty: favoriteNewsIsEmpty,
    page: favoriteNewsPage,
    setPage: setFavoriteNewsPage,
  } = useInfiniteFavoriteNews({ pageSize: 20 });

  const getTabPanes = (): TabPaneProps[] => {
    return [
      {
        tab: t('All'),
        key: TAB_KEY.all,
        children: (
          <InfiniteNewList
            infiniteListProps={{
              isEmpty: newsIsEmpty,
              hasMore: newsHasMore,
              loading: newsLoading,
              page: newsPage,
              setPage: setNewsPage,
            }}
            newListProps={{
              news,
            }}
          />
        ),
      },
      {
        tab: t('FavoriteList'),
        key: TAB_KEY.favoriteList,
        children: (
          <InfiniteNewList
            infiniteListProps={{
              isEmpty: favoriteNewsIsEmpty,
              hasMore: favoriteNewsHasMore,
              loading: favoriteNewsLoading,
              page: favoriteNewsPage,
              setPage: setFavoriteNewsPage,
            }}
            newListProps={{
              news: favoriteNews,
            }}
          />
        ),
      },
    ];
    // eslint-disable-next-line
  };

  return (
    <CustomLoading loading={newsLoading}>
      <TabContent
        title={t('News')}
        defaultActiveKey={TAB_KEY.all}
        tabPanes={getTabPanes()}
        rootPath={NEWS_PATH}
      />
    </CustomLoading>
  );
};
