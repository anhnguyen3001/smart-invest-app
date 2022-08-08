import { Modal } from 'antd';
import { Tag, Text } from 'src/components/elements';
import { News } from 'src/types';

interface NewsModalProps {
  news?: News;
  visible: boolean;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({
  news,
  visible,
  onClose,
}) => {
  if (!news) return null;

  const { title, content, symbol, time } = news;
  return (
    <Modal
      width="80%"
      style={{ maxHeight: '90%' }}
      visible={visible}
      footer={null}
      centered
      destroyOnClose
      closable={false}
      onCancel={onClose}
    >
      <Tag text={symbol} />
      <Text className="mt-16" level={1} fontWeight={700}>
        {title}
      </Text>
      <Text type="secondary" className="mt-4 mb-16">
        {new Date(time).toLocaleString('vi')}
      </Text>
      <div
        dangerouslySetInnerHTML={{
          __html: content || '',
        }}
      />
    </Modal>
  );
};
