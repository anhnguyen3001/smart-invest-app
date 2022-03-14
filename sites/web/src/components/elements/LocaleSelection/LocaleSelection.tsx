import { Dropdown, Menu } from 'antd';
import React from 'react';
import { REGIONS } from 'src/constants';
import { useLanguage } from 'src/hooks';

export const LocaleSelection: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const currentRegion = REGIONS[currentLanguage];

  const localizationMenu = (
    <Menu>
      {Object.values(REGIONS).map((el) => (
        <Menu.Item key={el.key} onClick={() => changeLanguage(el.key)}>
          <div className="d-flex align-items-center">
            {el.flag}
            <span style={{ marginLeft: 10 }}>{el.name}</span>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      overlay={localizationMenu}
      placement="bottomRight"
      trigger={['click']}
    >
      {currentRegion?.flag}
    </Dropdown>
  );
};
