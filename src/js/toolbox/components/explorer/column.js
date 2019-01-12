import React from "react";

function Column({ style, ...props }) {
  return (
    <div
      style={{
        width: 240,
        height: "100%",
        flex: "0 0 auto",
        borderRight: "1px solid black",
        overflowY: "auto",
        ...style
      }}
      {...props}
    />
  );
}

export default Column;
