import { Company } from 'src/types';
import { getCoreClient } from '../client';

export const companyService = {
  getCompany: async (companyId: number): Promise<Company> => {
    const axios = getCoreClient();
    const res = await axios.get(`/companies/${companyId}`);
    return res.data.data;
  },
};
