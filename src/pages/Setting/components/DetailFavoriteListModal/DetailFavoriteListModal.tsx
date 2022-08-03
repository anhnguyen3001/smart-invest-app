import { Button, Col, Input, Modal, Row } from 'antd';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
      title={name}
      footer={null}
    >
      <Row className="mb-16">
        <Col md={6} xs={12}>
          <Input
            size="large"
            placeholder={t('SearchInFavoriteList')}
            value={search}
            onChange={onChange}
          />
        </Col>
        <Col md={18} xs={12}>
          <Button size="large" type="primary" className="d-block ml-auto">
            {t('AddTicker')}
          </Button>
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
