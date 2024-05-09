import React from 'react'

export default function Stats({ habits, date}) {
  return (
    <div>{date.toLocaleDateString()}</div>
  )
}
