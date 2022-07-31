import { UploadImaggeResponse } from 'src/types';
import { imageClient } from '../client';

export const imageService = {
  upload: async (file: string): Promise<UploadImaggeResponse> => {
    const res = await imageClient.post('/image/upload', {
      file,
      upload_preset: 'ah_ticker',
    });

    return res.data;
  },
};
