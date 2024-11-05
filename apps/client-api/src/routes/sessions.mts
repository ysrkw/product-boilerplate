import { UserSession } from '@repo/sequelize'
import { Hono } from 'hono'
import { getSignedCookie, setSignedCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { Op } from 'sequelize'

import { SESSION_NAME, SESSION_SECRET } from '../constant.mjs'
import { createExpiredAt } from '../utils/create-expired-at.mjs'

export const sessions = new Hono()
  .get('/', async (c) => {
    const cookie = await getSignedCookie(c, SESSION_SECRET, SESSION_NAME)

    if (!cookie) return c.json({ ok: false })

    const count = await UserSession.count({
      where: {
        expiredAt: { [Op.gt]: new Date() },
        id: cookie,
      },
    })

    return c.json({ ok: count > 0 })
  })
  .put('/', async (c) => {
    const cookie = await getSignedCookie(c, SESSION_SECRET, SESSION_NAME)

    if (!cookie) throw new HTTPException(401)

    const session = await UserSession.findOne({
      where: {
        expiredAt: { [Op.gt]: new Date() },
        id: cookie,
      },
    })

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
