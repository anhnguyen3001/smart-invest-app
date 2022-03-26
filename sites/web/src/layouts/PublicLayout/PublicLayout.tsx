import { Col, Menu, Row } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './PublicLayout.module.scss';
import bgUnauth from 'src/assets/images/bg-unauth.png';
import { useTranslation } from 'react-i18next';
import { LocaleSelection, ThemeSwitcher } from 'src/components';

const cx = classNames.bind(styles);

export const PublicLayout: React.FC = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Row className={cx('container')}>
      <Col className={cx('left')} md={10} xs={{ span: 0 }}>
        <h2 className={cx('welcome')}>{t('WelcomeText')}</h2>
        <div className={cx('illustration')}>
          <img src={bgUnauth} alt="bg" />
        </div>
      </Col>

      <Col className={cx('right')} md={14} xs={24}>
        <Menu
          mode="horizontal"
          className={cx('menu', 'align-items-center', 'justify-content-end')}
          style={{ position: 'relative' }}
        >
          <Menu.Item key="locale" className={cx('px-0')}>
            <LocaleSelection />
          </Menu.Item>
          <Menu.Item key="theme" className={cx('pr-0', 'pl-16')}>
            <ThemeSwitcher />
          </Menu.Item>
        </Menu>

        <div className={cx('form', 'm-auto')}>{children}</div>
      </Col>
    </Row>
  );
};
