import { UserSession } from '@repo/sequelize'
import { Hono } from 'hono'
import { deleteCookie, getSignedCookie } from 'hono/cookie'

import { SESSION_NAME, SESSION_SECRET } from '../constant'

export const logout = new Hono().post('/', async (c) => {
  const cookie = await getSignedCookie(c, SESSION_SECRET, SESSION_NAME)

  if (cookie) await UserSession.destroy({ where: { id: cookie } })

  const session = deleteCookie(c, SESSION_NAME)

  return c.json({ session })
})
