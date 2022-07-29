import { SendOutlined } from '@ant-design/icons';
import { commentService } from 'src/api';
import { Button, Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CommentFormProps {
  companyId: number;
  afterSubmit?: () => void;
}

interface FormFields {
  content: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  companyId,
  afterSubmit,
}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [form] = useForm<FormFields>();

  const onFinish = async (values: FormFields) => {
    const content = values.content.trim();
    if (!content) return;

    setLoading(true);
    try {
      await commentService.createComment({ content, companyId });

      if (afterSubmit) {
        afterSubmit();
      }

      form.resetFields();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <div className="d-flex mb-4" style={{ columnGap: 8 }}>
        <Form.Item name="content" className="flex-1 mb-0">
          <TextArea
            placeholder={t('YouWantToShareSomething')}
            showCount
            maxLength={255}
            autoSize={{ minRows: 1, maxRows: 3 }}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<SendOutlined style={{ fontSize: 18 }} />}
          loading={loading}
        />
      </div>
    </Form>
  );
};
