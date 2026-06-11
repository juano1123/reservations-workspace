import React from "react";
import * as Icons from "react-feather";

export type IconName = keyof typeof Icons;

export type IconProps = {
  name: IconName;
  className?: string;
} & Icons.IconProps;

const Icon: React.FC<IconProps> = ({
  name,
  className = "",
  width = 20,
  height = 20,
  ...props
}) => {
  const IconComponent = Icons[name];
  return (
    <IconComponent
      className={className}
      {...props}
      width={width}
      height={height}
    />
  );
};

export default Icon;
