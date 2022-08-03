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
          __html:
            content ||
            '<p class="Normal">Ông Nguyễn Hùng Cường, Phó Chủ tịch Đầu tư Phát triển Xây Dựng (DIC Corp, HoSE: DIG) đã không mua cổ phiếu nào trên tổng số 10 triệu cổ phiếu đã đăng ký hồi tháng 6. Lý do được ông đưa ra là không thu xếp kịp tài chính. Hiện ông đang nắm giữ 62,7 triệu cổ phiếu DIG, tương đương với 10,3% vốn.</p>',
        }}
      />
    </Modal>
  );
};
