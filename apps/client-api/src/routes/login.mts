import { getConnInfo } from '@hono/node-server/conninfo'
import { zValidator } from '@hono/zod-validator'
import { Session, User } from '@repo/sequelize'
import { verify } from 'argon2'
import { Hono } from 'hono'
import { setSignedCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { ulid } from 'ulid'
import { z } from 'zod'

import { SESSION_NAME, SESSION_SECRET } from '../constant.mjs'
import { createExpiredAt } from '../utils/create-expired-at.mjs'

export const login = new Hono().post(
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

    const user = await User.findOne({ where: { email: body.email } })

    if (user === null) throw new HTTPException(401)

    const isVerified = await verify(user.passwordHash, body.password)

    if (!isVerified) throw new HTTPException(401)

    const info = getConnInfo(c)

    const session = await Session.create({
      expiredAt: createExpiredAt(),
      id: ulid(),
      ipAddress: info.remote.address ?? '',
      userId: user.id,
    })

    await setSignedCookie(c, SESSION_NAME, session.id, SESSION_SECRET, {
      expires: session.expiredAt,
      httpOnly: true,
      sameSite: 'Strict',
      secure: true,
    })

    return c.json({ session })
  },
)
