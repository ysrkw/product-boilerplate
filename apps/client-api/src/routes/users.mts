import { User } from '@repo/sequelize'
import { Hono } from 'hono'

export const users = new Hono()
  .get('/', async (c) => {
    const users = await User.findAll()

    return c.json({ users })
  })
  .get('/:id', async (c) => {
    const parameter = c.req.param()

    const user = await User.findByPk(parameter.id)

    return c.json({ user })
  })
