import { UploadImaggeResponse } from 'src/types';
import { getImageClient } from '../client';

export const imageService = {
  upload: async (file: string): Promise<UploadImaggeResponse> => {
    const axios = getImageClient();
    const res = await axios.post('/image/upload', {
      file,
      upload_preset: 'ah_ticker',
    });

    return res.data;
  },
};
