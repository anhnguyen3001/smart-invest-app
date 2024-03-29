import { Company } from 'src/types';
import { bffClient } from '../client';

export const companyService = {
  getCompany: async (companyId: number): Promise<Company> => {
    const res = await bffClient.get(`/company/${companyId}`);
    return res.data.data;
  },
};
