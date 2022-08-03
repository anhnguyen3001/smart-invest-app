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
        {'Con trai Chủ tịch DIG không kịp thu xếp tài chính để mua 10 triệu cổ phiếu như đã đăng ký' ||
          title}
      </Text>
      <Text type="secondary" className="mt-4 mb-16">
        {new Date(time).toLocaleString('vi')}
      </Text>
      <div
        dangerouslySetInnerHTML={{
          __html:
            content ||
            '<div style="font-size: 14px; font-weight: bold;">Ông Nguyễn Hùng Cường, Phó Chủ tịch HĐQT DIC Corp trước đó đã đăng ký mua 10 triệu cổ phiếu DIG trong thời gian từ 30/6 – 29/7 nhưng không mua được bất kỳ cổ phiếu nào với lý do không kịp thu xếp tài chính.</div><p>Ông Nguyễn Hùng Cường, Phó Chủ tịch HĐQT Tổng CTCP Đầu tư Phát triển Xây dựng (DIC Corp – mã DIG) vừa thông báo không mua được cổ phiếu nào trên tổng số 10 triệu đơn vị đăng ký trước đó. Thời gian giao dịch từ 30/6 – 29/7, nguyên nhân không hoàn thành giao dịch được đưa ra là do không thu xếp kịp tài chính.<br></p><p>Sau giao dịch, lượng sở hữu ông Cường vẫn giữ nguyên ở mức 62,7 triệu cổ phiếu, tương ứng tỷ lệ 10,28% vốn tại DIC Corp. Được biết, ông Cường là con trai của ông Nguyễn Thiện Tuấn, Chủ tịch HĐQT DIC Corp. Ông Tuấn hiện cũng đang trực tiếp nắm giữ 50,4 triệu cổ phiếu DIG (tỷ lệ 10,09%) và gián tiếp sở hữu 84,4 triệu đơn vị (tỷ lệ 16,89%) thông qua CTCP Đầu tư Phát triển Thiên Tân.</p>',
        }}
      />
    </Modal>
  );
};
