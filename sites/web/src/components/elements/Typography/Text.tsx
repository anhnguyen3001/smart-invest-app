import React from "react";
import "./Text.scss";

interface TextProps {
  level?: 1 | 2 | 3 | 4;
  fontWeight?: 500 | 700 | 900;
  italic?: boolean;
  lines?: number;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "ceil"
    | "floor"
    | "link";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => any;
}

const getClassname = ({
  level,
  fontWeight,
  color,
  italic,
  className,
}: Partial<TextProps>) => {
  const classNames = [];

  if (level) {
    classNames.push(`text-${level}`);
  }
  if (fontWeight) {
    classNames.push(`text-${fontWeight}`);
  }
  if (color) {
    classNames.push(`${color}-color`);
  }
  if (italic) {
    classNames.push("text-italic");
  }

  if (className) {
    classNames.push(className);
  }
  return classNames.join(" ");
};

export const Text: React.FC<TextProps> = ({
  lines,
  children,
  onClick,
  style,
  ...rest
}) => {
  return (
    <div
      className={getClassname({ lines, ...rest })}
      style={{ ...(lines && { WebkitLineClamp: lines }), ...style }}
      children={children}
      onClick={onClick}
    />
  );
};
