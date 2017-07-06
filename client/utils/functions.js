import React from 'react'

export function capitalize (string) {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getDepositValue (price, hour) {
  const array = []
  let limit = 11
  if (hour) limit = 6
  for (let i = 0; i < limit; i++) {
    array.push(<option value={price * i} key={i}>{i}x ${price * i} </option>)
  }
  return array
}
