import React from 'react'
import moment from 'moment'

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

export function getDuration (start, end) {
  if (!moment(start).isBefore(end)) {
    return 'Start date is after end date'
  }
  const ms = moment(start, 'DD/MM/YYYY HH:mm').diff(moment(end, 'DD/MM/YYYY HH:mm'))
  const d = moment.duration(ms)
  return Math.floor(d.asHours()) + 1
}

export function getDateArray (start, end) {
  const now = moment(start).clone()
  const dates = []

  while (now.isBefore(moment(end)) || now.isSame(moment(end))) {
    dates.push(now.format('M/D/YYYY'))
    now.add('days', 1)
  }
  return dates
}
