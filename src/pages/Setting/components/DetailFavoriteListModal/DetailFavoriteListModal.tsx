import { Button, Col, Form, Input, Modal, notification, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomLoading, Text } from 'src/components';
import { useFavoriteTickers } from 'src/hooks';
import { TickerList } from 'src/pages/Search/components';
import { FavoriteList } from 'src/types';
import { GetFavoriteTickersParams } from 'src/types/favoriteTicker';
import debounce from 'lodash.debounce';
import { AddTickerModal } from '../AddTickerModal';
import { favoriteTickerService } from 'src/api/services/favoriteTicker';
import { favoriteListService } from 'src/api/services/favoriteList';

interface DetailFavoriteListModalProps {
  favoriteList?: FavoriteList;
  visible: boolean;
  onClose: () => void;
}

export const DetailFavoriteListModal: React.FC<
  DetailFavoriteListModalProps
> = ({ visible, favoriteList, onClose }) => {
  const { t } = useTranslation();

  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id, name } = favoriteList || {};

  const [search, setSearch] = useState('');
  const [params, setParams] = useState<GetFavoriteTickersParams>();

  const { mutate, ...data } = useFavoriteTickers(params, visible);

  useEffect(() => {
    if (visible) {
      setParams((prev) => ({ ...prev, listId: id }));
    }
  }, [visible]);

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

  const onDeleteTicker = async (tickerId: number = 0) => {
    setLoading(true);

    try {
      await favoriteListService.deleteFavoriteTicker(id || 0, tickerId);
      mutate();
      notification.success({ message: t('DeleteSuccessfully') });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomLoading loading={loading}>
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
              <Button
                size="large"
                type="primary"
                onClick={() => setVisibleAddModal(true)}
              >
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
            onDelete={onDeleteTicker}
            onChangePagination={(page, pageSize) =>
              setParams((prev) => ({ ...prev, page, pageSize }))
            }
            emptyMessage={t('NotHaveTickerYet')}
          />
        </Modal>
        <AddTickerModal
          listId={id}
          visible={visibleAddModal}
          onClose={() => setVisibleAddModal(false)}
          mutate={mutate}
          setLoading={setLoading}
        />
      </CustomLoading>
    </>
  );
};
