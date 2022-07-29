import { useEffect, useState } from 'react';
import { companyService } from 'src/api';
import { useApp } from 'src/contexts';
import { convertPrice } from 'src/helpers';
import { mockCompany, mockTickerPrice } from 'src/mock';
import { Company } from 'src/types';

export const useCompany = (companyId?: string) => {
  const { setLoading } = useApp();

  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    // setCompany(mockCompany);
    // return;
    const fetchCompany = async () => {
      setLoading(true);

      try {
        const res = await companyService.getCompany(parseInt(companyId || '0'));
        setCompany(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
    // eslint-disable-next-line
  }, [companyId]);

  const { exchange, price = mockTickerPrice } = (company || {}) as Company;
  const tickerPrice = convertPrice(exchange, price);

  return {
    company,
    tickerPrice,
  };
};
