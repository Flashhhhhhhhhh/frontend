import React from 'react'

function Truncate({ style, ...props }) {
  return (
    <span
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...style,
      }}
      {...props}
    />
  )
}

export default Truncate
