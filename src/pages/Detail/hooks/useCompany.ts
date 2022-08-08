import { useEffect } from 'react';
import { companyService } from 'src/api';
import { useApp } from 'src/contexts';
import { convertPrice } from 'src/helpers';
import { Company } from 'src/types';
import useSWR from 'swr';

export const useCompany = (companyId?: string) => {
  const { setLoading } = useApp();

  const { data: company, error } = useSWR(
    companyId ? ['company', companyId] : null,
    async () => {
      if (!companyId) return;

      return await companyService.getCompany(parseInt(companyId));
    },
    { revalidateOnFocus: false },
  );

  const { exchange, price } = (company || {}) as Company;
  const tickerPrice = convertPrice(exchange, price);

  useEffect(() => {
    setLoading(!company && !error);
  }, [company, error]);

  return {
    company,
    tickerPrice,
  };
};
