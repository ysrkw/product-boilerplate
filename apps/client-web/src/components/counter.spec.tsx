import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { Counter } from './counter'

describe('Counter', () => {
  test('initialize', () => {
    render(<Counter />)

    expect(screen.getByText('count: 0')).toBeInTheDocument()
  })

  test('increment', async () => {
    render(<Counter />)

    const user = userEvent.setup()

    await user.click(screen.getByText('increment'))

    expect(screen.getByText('count: 1')).toBeInTheDocument()
  })

  test('decrement', async () => {
    render(<Counter />)

    const user = userEvent.setup()

    await user.click(screen.getByText('decrement'))

    expect(screen.getByText('count: -1')).toBeInTheDocument()
  })
})
