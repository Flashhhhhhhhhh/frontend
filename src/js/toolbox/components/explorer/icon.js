import React from "react";

function Icon({ icon: Icon, size, style, ...props }) {
  const attrs = {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "inline-block",
      verticalAlign: "middle",
      ...style
    }
  };

  return (
    <svg {...attrs} {...props}>
      <Icon />
    </svg>
  );
}

Icon.defaultProps = {
  size: 24
};

export function ChevronRight() {
  return (
    <React.Fragment>
      <polyline points="9 18 15 12 9 6" />
    </React.Fragment>
  );
}

export default Icon;
