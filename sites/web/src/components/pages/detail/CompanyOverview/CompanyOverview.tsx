import { ICompany } from '@ah-ticker/common';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind({});

interface CompanyOverviewProps {
  company?: ICompany;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({
  company,
}) => {
  const { t } = useTranslation();
  if (!company) return null;

  return <div>Company overview</div>;
};
