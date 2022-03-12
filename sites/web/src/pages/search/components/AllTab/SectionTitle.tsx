import { Button } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind({});

interface SectionTitleProps {
  className?: string;
  title: string;
  onShowMore: () => void;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  className,
  title,
  onShowMore,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={cx(
        'd-flex',
        'justify-content-between',
        'align-items-center',
        'mb-16',
        className,
      )}
    >
      <h3>{title}</h3>
      <Button type="link" onClick={onShowMore}>
        {t('ViewMore')}
      </Button>
    </div>
  );
};
