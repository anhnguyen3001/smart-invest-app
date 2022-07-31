import { Company } from 'src/types';
import { coreClient } from '../client';

export const companyService = {
  getCompany: async (companyId: number): Promise<Company> => {
    const res = await coreClient.get(`/companies/${companyId}`);
    return res.data.data;
  },
};
