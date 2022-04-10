import { UploadImaggeRes } from 'src/types';
import { getImageAxios } from '../client';

export const imageService = {
  upload: async (file: string): Promise<UploadImaggeRes> => {
    const axios = getImageAxios();
    const res = await axios.post('/image/upload', {
      file,
      upload_preset: 'ah_ticker',
    });

    return res.data;
  },
};
