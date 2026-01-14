'use client'

import React from 'react'
import { useState } from 'react'
export default function Counter() {
    const [count, setCount] = useState(0)
  return (
    <div>
      <div>
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  )
}
