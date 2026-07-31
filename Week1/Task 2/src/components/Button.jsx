import { useState } from 'react'

export default function Button({ children, variant, size, onClick, disabled }) {
  const [clickCount, setClickCount] = useState(0)

  const handleClick = (e) => {
    setClickCount(prev => prev + 1)
    if (onClick) onClick(e, clickCount + 1)
  }

  const classes = [
    'btn',
    variant ? `btn-${variant}` : 'btn-primary',
    size ? `btn-${size}` : 'btn-md',
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      onClick={handleClick}
      disabled={disabled}
    >
      {children} {clickCount > 0 && `(${clickCount})`}
    </button>
  )
}