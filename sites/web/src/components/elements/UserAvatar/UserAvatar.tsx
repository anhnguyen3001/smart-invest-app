import { Gender, IUser } from '@ah-ticker/common';
import { Avatar, AvatarProps } from 'antd';
import React from 'react';
import defaultFemale from 'src/assets/images/default_female_ava.jpg';
import defaultMale from 'src/assets/images/default_male_ava.png';

interface UserAvatarProps extends AvatarProps {
  user?: IUser;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...rest }) => {
  if (!user) return null;

  const getAvatarSrc = () => {
    const { avatar, gender } = user;

    if (avatar) return avatar;
    if (gender === Gender.female) return defaultFemale;

    return defaultMale;
  };

  return <Avatar src={getAvatarSrc()} {...rest} />;
};
