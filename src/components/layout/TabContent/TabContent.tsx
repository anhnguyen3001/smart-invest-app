import { Tabs } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useWindowResize } from 'src/hooks';
import styles from './TabContent.module.scss';

const cx = classNames.bind(styles);

export interface TabPaneProps {
  tab: React.ReactNode;
  key: string;
  children: React.ReactNode;
}

interface TabContentProps {
  title?: string;
  tabPanes: TabPaneProps[];
  defaultActiveKey: string;
  rootPath: string;
}

export const TabContent: React.FC<TabContentProps> = ({
  title,
  tabPanes,
  defaultActiveKey,
  rootPath,
}) => {
  const history = useHistory();

  const query = useQuery();
  const activeTab = query.get('tab') || defaultActiveKey;

  const { isMobileView } = useWindowResize();

  const renderTabContent = () => {
    return tabPanes.map(({ children, ...rest }) => (
      <Tabs.TabPane {...rest}>{children}</Tabs.TabPane>
    ));
  };

  return (
    <div className={cx('container')}>
      <h2 className={cx('mb-16')}> {title}</h2>
      <Tabs
        className={cx('tab', 'flex-1')}
        tabPosition={isMobileView ? 'top' : 'left'}
        defaultActiveKey={activeTab}
        onTabClick={(key: string) => history.push(`${rootPath}?tab=${key}`)}
      >
        {renderTabContent()}
      </Tabs>
    </div>
  );
};
