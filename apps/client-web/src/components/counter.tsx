import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1)
  }

  function decrement() {
    setCount(count - 1)
  }

  return (
    <>
      <div>count: {count}</div>
      <div>
        <button onClick={increment}>increment</button>
      </div>
      <div>
        <button onClick={decrement}>decrement</button>
      </div>
    </>
  )
}
