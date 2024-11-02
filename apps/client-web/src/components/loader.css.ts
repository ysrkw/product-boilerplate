import { keyframes, style } from '@vanilla-extract/css'

const loader = keyframes({
  to: { transform: 'rotate(0.5turn)' },
})

export const container = style({
  animation: `${loader} 1s infinite`,
  border: '4px solid',
  borderColor: '#000 #0000',
  borderRadius: '50%',
  boxSizing: 'border-box',
  height: 40,
  width: 40,
})
