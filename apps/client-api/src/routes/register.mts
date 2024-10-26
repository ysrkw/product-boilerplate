import { getConnInfo } from '@hono/node-server/conninfo'
import { zValidator } from '@hono/zod-validator'
import { Session, User } from '@repo/sequelize'
import { hash } from 'argon2'
import { Hono } from 'hono'
import { setSignedCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { ulid } from 'ulid'
import { z } from 'zod'

import { SESSION_NAME, SESSION_SECRET } from '../constant.mjs'
import { sequelize } from '../database.mjs'
import { createExpiredAt } from '../utils/create-expired-at.mjs'

export const register = new Hono().post(
  '/',
  zValidator(
    'json',
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  ),
  async (c) => {
    const body = c.req.valid('json')

    const count = await User.count({ where: { email: body.email } })

    if (count > 0) throw new HTTPException(401)

    const passwordHash = await hash(body.password)

    const info = getConnInfo(c)

    const { session, user } = await sequelize.transaction(async () => {
      const user = await User.create({
        email: body.email,
        id: ulid(),
        passwordHash,
      })

      const session = await Session.create({
        expiredAt: createExpiredAt(),
        id: ulid(),
        ipAddress: info.remote.address ?? '',
        userId: user.id,
      })

      return { session, user }
    })

    await setSignedCookie(c, SESSION_NAME, session.id, SESSION_SECRET, {
      expires: session.expiredAt,
      httpOnly: true,
      sameSite: 'Strict',
      secure: true,
    })

    return c.json({ session, user })
  },
)
