import { Password, Session, User } from '@repo/sequelize'
import { Hono } from 'hono'
import { getSignedCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'

import { SESSION_NAME, SESSION_SECRET } from '../constant.mjs'

export const users = new Hono().get('/me', async (c) => {
  const cookie = await getSignedCookie(c, SESSION_SECRET, SESSION_NAME)

  if (!cookie) throw new HTTPException(401)

  const session = await Session.findByPk(cookie)

  if (session === null) throw new HTTPException(401)

  const user = await User.findByPk(session.userId, {
    include: [User.associations.sessions],
  })

  if (user === null) throw new HTTPException(401)

  const password = await Password.findOne({
    order: [['id', 'DESC']],
    where: { userId: user.id },
  })

  if (password === null) throw new HTTPException(401)

  return c.json({ registeredAt: password.registeredAt, user })
})
