import React from 'react'

export default function BaseBadge({ baseKey }) {
  const map = {
    binary: { label: 'Binary', tag: 'BIN' },
    octal:  { label: 'Octal',  tag: 'OCT' },
    hex:    { label: 'Hexadecimal', tag: 'HEX' }
  }
  const m = map[baseKey]
  return (
    <span className="badge" title={m.label}>
      <strong>{m.tag}</strong> {m.label}
    </span>
  )
}
