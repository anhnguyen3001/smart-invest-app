import { Modal, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import { GetTickersNotFavoriteParams } from 'src/types';
import debounce from 'lodash.debounce';
import { TickerList } from 'src/pages/Search/components';
import { useTranslation } from 'react-i18next';
import { useTickersNotFavorite } from '../../hooks';

interface AddTickerModalProps {
  listId?: number;
  visible: boolean;
  onClose: () => void;
}

export const AddTickerModal: React.FC<AddTickerModalProps> = ({
  listId = 0,
  visible,
  onClose,
}) => {
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const [params, setParams] = useState<GetTickersNotFavoriteParams>({
    search,
  });

  const data = useTickersNotFavorite(listId, params);

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

  return (
    <Modal
      width="90%"
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
      />
    </Modal>
  );
};
