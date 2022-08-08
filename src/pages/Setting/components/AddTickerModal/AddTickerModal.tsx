import { Modal, Input, notification } from 'antd';
import React, { useCallback, useState } from 'react';
import { GetTickersNotFavoriteParams } from 'src/types';
import debounce from 'lodash.debounce';
import { TickerList } from 'src/pages/Search/components';
import { useTranslation } from 'react-i18next';
import { useTickersNotFavorite } from '../../hooks';
import { favoriteTickerService } from 'src/api/services/favoriteTicker';

interface AddTickerModalProps {
  listId?: number;
  visible: boolean;
  onClose: () => void;
  mutate: () => void;
  setLoading: (loading: boolean) => void;
}

export const AddTickerModal: React.FC<AddTickerModalProps> = ({
  listId = 0,
  visible,
  onClose,
  mutate: currentListMutate,
  setLoading,
}) => {
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const [params, setParams] = useState<GetTickersNotFavoriteParams>({
    search,
  });

  const { mutate, ...data } = useTickersNotFavorite(
    { ...params, listId },
    visible,
  );

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

  const onAddTicker = async (tickerId: number = 0) => {
    setLoading(true);
    try {
      await favoriteTickerService.addTicker(tickerId, listId);
      notification.success({
        message: t('AddSuccessfully'),
      });
      currentListMutate();
      mutate();
    } catch (e) {
      console.error(e);
      return e;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      width="90%"
      style={{ maxHeight: '90%' }}
      centered
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      title={t('AddTicker')}
    >
      <Input
        className="mb-16"
        size="large"
        placeholder={t('SearchTickerHere')}
        value={search}
        onChange={onChange}
      />

      <TickerList
        {...data}
        onChangePagination={(page, pageSize) =>
          setParams((prev) => ({ ...prev, page, pageSize }))
        }
        onAdd={onAddTicker}
      />
    </Modal>
  );
};
