import { Session, User } from '@repo/sequelize'
import { Hono } from 'hono'
import { getSignedCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'

import { SESSION_NAME, SESSION_SECRET } from '../constant.mjs'

export const users = new Hono().get('/me', async (c) => {
  const cookie = await getSignedCookie(c, SESSION_SECRET, SESSION_NAME)

  if (!cookie) throw new HTTPException(401)

  const session = await Session.findByPk(cookie)

  if (session === null) throw new HTTPException(401)

  const user = await User.findByPk(session.userId)

  if (user === null) throw new HTTPException(401)

  return c.json({ user })
})
