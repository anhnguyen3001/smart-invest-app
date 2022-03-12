export type TypographyType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'ceil'
  | 'floor'
  | 'link';

export interface TypographyProps {
  level?: 1 | 2 | 3 | 4;
  fontWeight?: 500 | 700 | 900;
  type?: TypographyType;
}

export const getClassname = ({
  level,
  fontWeight,
  type,
}: TypographyProps): string[] => {
  const classNames = [];

  if (level) {
    classNames.push(`text-${level}`);
  }
  if (fontWeight) {
    classNames.push(`text-${fontWeight}`);
  }
  if (type) {
    classNames.push(`${type}-color`);
  } else {
    classNames.push(`inherit-color`);
  }

  return classNames;
};
