import { UploadImaggeResponse } from 'src/types';
import { imageClient } from '../client';

export const imageService = {
  upload: async (file: string): Promise<UploadImaggeResponse> => {
    const res = await imageClient.post('/image/upload', {
      file,
      upload_preset: 'smart_invest',
    });

    return res.data;
  },
};
