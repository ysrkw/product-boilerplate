import { User } from '@repo/sequelize'
import { Hono } from 'hono'

export const users = new Hono().get('/', async (context) => {
  const users = await User.findAll()

  return context.json(users)
})
