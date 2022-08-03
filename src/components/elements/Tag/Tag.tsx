import classNames from 'classnames/bind';
import { Text } from '../Typography';
import styles from './Tag.module.scss';

const cx = classNames.bind(styles);

interface TagProps {
  className?: string;
  text: string;
}

export const Tag: React.FC<TagProps> = ({ className, text }) => {
  return (
    <Text fontWeight={500} className={cx('tag', 'py-8', 'px-16', className)}>
      {text}
    </Text>
  );
};
