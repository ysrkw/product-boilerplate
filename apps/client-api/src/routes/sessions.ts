import { Session } from '@repo/sequelize'
import { Hono } from 'hono'
import { setSignedCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'

import { SESSION_NAME, SESSION_SECRET } from '../constant'
import { createExpiredAt } from '../utils/create-expired-at'

export const sessions = new Hono()
  .get('/:id', async (c) => {
    const parameter = c.req.param()

    const session = await Session.findByPk(parameter.id)

    if (session === null) throw new HTTPException(401)

    return c.json({ session })
  })
  .put('/:id', async (c) => {
    const parameter = c.req.param()

    const session = await Session.findByPk(parameter.id)

    if (session === null) throw new HTTPException(401)

    session.expiredAt = createExpiredAt()

    await session.save()

    await setSignedCookie(c, SESSION_NAME, session.id, SESSION_SECRET, {
      expires: session.expiredAt,
      httpOnly: true,
      sameSite: 'Strict',
      secure: true,
    })

    return c.json({ session })
  })
