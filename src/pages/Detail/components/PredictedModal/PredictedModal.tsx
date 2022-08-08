import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { tickerService } from 'src/api';
import { CustomLoading, LineChart } from 'src/components';
import useSWR from 'swr';

interface PredictedModalProps {
  symbol: string;
  visible: boolean;
  onClose: () => void;
}

export const PredictedModal: React.FC<PredictedModalProps> = ({
  symbol,
  visible,
  onClose,
}) => {
  const { t } = useTranslation();
  const { data, error } = useSWR(['predicted-price', symbol], () => {
    return tickerService.getPredicted({ symbol });
  });

  return (
    <Modal
      destroyOnClose
      visible={visible}
      onCancel={onClose}
      footer={null}
      title={t('PredictedPrice')}
    >
      <CustomLoading loading={!data && !error}>
        <LineChart
          loading={!data && !error}
          prices={data?.tickerPrices?.map((price, index) => ({
            value: parseFloat(price.toFixed(2)),
            time: new Date(
              new Date().getTime() + (index + 2) * 1000 * 60 * 60 * 24,
            ).toLocaleDateString(),
          }))}
        />
      </CustomLoading>
    </Modal>
  );
};
