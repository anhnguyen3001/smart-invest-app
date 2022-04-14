import { User } from '@smart-invest/common';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, AvatarProps } from 'antd';
import React from 'react';

interface UserAvatarProps extends AvatarProps {
  user?: User;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...rest }) => {
  if (!user) return null;
  const { avatar } = user;

  return (
    <Avatar
      {...(avatar ? { src: avatar } : { icon: <UserOutlined /> })}
      {...rest}
    />
  );
};
