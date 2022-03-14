import { Tabs } from 'antd';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useWindowResize } from 'src/hooks';
import styles from './TabContent.module.scss';

const cx = classNames.bind(styles);

export interface TabPaneProps {
  tab: string;
  key: string;
  children: React.ReactNode;
}

interface TabContentProps {
  title: string;
  tabPanes: TabPaneProps[];
  defaultActiveKey: string;
}

export const TabContent: React.FC<TabContentProps> = ({
  title,
  tabPanes,
  defaultActiveKey,
}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  const { isMobileView } = useWindowResize();

  const renderTabContent = () => {
    return tabPanes.map(({ children, ...rest }) => (
      <Tabs.TabPane {...rest}>
        <div className={cx('content')}>{children}</div>
      </Tabs.TabPane>
    ));
  };

  return (
    <div className={cx('container')}>
      <h2 className={cx('mb-16')}>{title}</h2>
      <Tabs
        className={cx('tab', 'flex-1')}
        tabPosition={isMobileView ? 'top' : 'left'}
        activeKey={activeKey}
        onTabClick={setActiveKey}
      >
        {renderTabContent()}
      </Tabs>
    </div>
  );
};
