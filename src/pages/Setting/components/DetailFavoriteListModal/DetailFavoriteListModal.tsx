import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components';
import { useFavoriteTickers } from 'src/hooks';
import { TickerList } from 'src/pages/Search/components';
import { FavoriteList } from 'src/types';
import { GetFavoriteTickersParams } from 'src/types/favoriteTicker';
import debounce from 'lodash.debounce';

interface DetailFavoriteListModalProps {
  favoriteList?: FavoriteList;
  visible: boolean;
  onClose: () => void;
}

export const DetailFavoriteListModal: React.FC<
  DetailFavoriteListModalProps
> = ({ visible, favoriteList, onClose }) => {
  const { t } = useTranslation();

  const { id, name } = favoriteList || {};

  const [search, setSearch] = useState('');
  const [params, setParams] = useState<GetFavoriteTickersParams>({
    listId: id,
    search,
  });

  const debounceSearch = useCallback(
    debounce(
      (nextValue: string) =>
        setParams((prev) => ({ ...prev, search: nextValue })),
      500,
    ),
    [],
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    setSearch(value);
    debounceSearch(value);
  };
  const data = useFavoriteTickers(params);

  return (
    <Modal
      width="80%"
      style={{ height: '50%' }}
      centered
      visible={visible}
      onCancel={onClose}
      closable={false}
      footer={null}
      destroyOnClose
    >
      <Row className="mb-16" align="middle" gutter={[16, 16]}>
        <Col md={12} xs={24}>
          <Text level={1} fontWeight={700} ellipsis>
            {t('List')}: {name}
          </Text>
        </Col>
        <Col md={12} xs={24} className="text-right">
          <Button size="large" type="primary">
            {t('AddTicker')}
          </Button>
        </Col>
        <Col md={6} xs={24}>
          <Input
            size="large"
            placeholder={t('SearchInFavoriteList')}
            value={search}
            onChange={onChange}
          />
        </Col>
      </Row>

      <TickerList
        {...data}
        onChangePagination={(page, pageSize) =>
          setParams((prev) => ({ ...prev, page, pageSize }))
        }
      />
    </Modal>
  );
};
