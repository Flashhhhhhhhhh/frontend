import React from 'react';

function Item({ style, ...props }) {
  return (
    <button
      style={{
        width: '100%',
        height: 32,
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px 0 8px',
        fontFamily: 'inherit',
        fontSize: 14,
        textAlign: 'left',
        border: 0,
        outline: 0,
        WebkitAppearance: 'none',
        ...style,
      }}
      {...props}
    />
  )
}

export default Item