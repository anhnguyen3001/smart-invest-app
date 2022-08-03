import { Modal } from 'antd';
import { tickerService } from 'src/api';
import { CustomLoading, LineChart } from 'src/components';
import Chart from 'react-apexcharts';
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
  const { data, error } = useSWR(['predicted-price', symbol], () => {
    return tickerService.getPredicted({ symbol });
  });
  return (
    <Modal destroyOnClose visible={visible} onCancel={onClose} footer={null}>
      <CustomLoading loading={!data && !error}>
        <Chart
          options={{
            chart: { id: 'predicted price' },
            xaxis: { categories: data?.tickerPrices?.map(() => '') || [] },
          }}
          series={[
            {
              name: 'price',
              data:
                data?.tickerPrices.map((value) =>
                  parseFloat(value.toFixed(2)),
                ) || [],
            },
          ]}
        />
      </CustomLoading>
    </Modal>
  );
};
