import { User } from '@repo/sequelize'
import { Hono } from 'hono'

export const users = new Hono().get('/', async (c) => {
  const users = await User.findAll()

  return c.json(users)
})
