import { Company, companyService } from '@smart-invest/common';
import { useEffect, useState } from 'react';
import { useApp } from 'src/contexts';
import { convertPrice } from 'src/helpers';

export const useCompany = (companyId?: string) => {
  const { setLoading } = useApp();

  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);

      try {
        const res = await companyService.getCompany(parseInt(companyId || '0'));
        setCompany(res);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
    // eslint-disable-next-line
  }, [companyId]);

  const { exchange, price } = (company || {}) as Company;
  const tickerPrice = convertPrice(exchange, price);

  return {
    company,
    tickerPrice,
  };
};
