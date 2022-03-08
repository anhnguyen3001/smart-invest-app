import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';
import React from 'react';
import usaIcon from 'src/assets/images/usa.svg';
import vietnamIcon from 'src/assets/images/vietnam.svg';
import { translations as enTrans } from 'src/locales/en';
import { translations as viTrans } from 'src/locales/vi';
import { IRegion } from 'src/types';

export const LANG_RESOURCES = {
  vi: { translation: viTrans },
  en: { translation: enTrans },
};

export const DEFAULT_LANG = 'en';

export const REGIONS: IRegion = {
  vi: {
    key: 'vi',
    name: 'Tiếng Việt',
    flag: (
      <img
        src={vietnamIcon}
        style={{ width: 18, height: 18 }}
        alt="vietnamese"
      />
    ),
    antdLocale: viVN,
  },
  en: {
    key: 'en',
    name: 'English',
    flag: <img src={usaIcon} style={{ width: 18, height: 18 }} alt="english" />,
    antdLocale: enUS,
  },
};
