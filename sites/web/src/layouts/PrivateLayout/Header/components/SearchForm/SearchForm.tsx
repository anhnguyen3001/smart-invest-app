import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { InputSearch } from 'src/components';
import { SEARCH_PATH } from 'src/constants';
import { useQuery } from 'src/hooks';

interface SearchFormFields {
  q?: string;
}

interface SearchFormProps {
  setDefaultValue?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  setDefaultValue = false,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const query = useQuery();

  const [form] = useForm<SearchFormFields>();
  const initialValues: SearchFormFields = {
    q: query.get('q') || '',
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      form.submit();
    }
  };

  const onSubmit = (values: SearchFormFields) => {
    const formatedQ = values.q?.trim();

    if (formatedQ) {
      history.push(`${SEARCH_PATH}?q=${formatedQ}`);
    }
  };

  return (
    <Form
      form={form}
      initialValues={setDefaultValue ? initialValues : undefined}
      onKeyDown={onKeyDown}
      onFinish={onSubmit}
    >
      <Form.Item noStyle name="q">
        <InputSearch placeholder={t('SearchTickerHere')} />
      </Form.Item>
    </Form>
  );
};
