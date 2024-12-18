import { getConnInfo } from '@hono/node-server/conninfo'
import { zValidator } from '@hono/zod-validator'
import { User, UserPassword, UserSession } from '@repo/sequelize'
import argon2 from 'argon2'
import { Hono } from 'hono'
import { setSignedCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { ulid } from 'ulid'
import { z } from 'zod'

import { SESSION_NAME, SESSION_SECRET } from '../constant'
import { createExpiredAt } from '../utils/create-expired-at'

export const login = new Hono().post(
  '/',
  zValidator(
    'form',
    z.object({
      email: z.string().email(),
      password: z.string().min(8).max(80),
    }),
  ),
  async (c) => {
    const body = c.req.valid('form')

    const user = await User.findOne({ where: { email: body.email } })

    if (user === null) throw new HTTPException(401)

    const password = await UserPassword.findOne({
      order: [['id', 'DESC']],
      where: { userId: user.id },
    })

    if (password === null) throw new HTTPException(401)

    const isVerified = await argon2.verify(password.hash, body.password)

    if (!isVerified) throw new HTTPException(401)

    const info = getConnInfo(c)

    const session = await UserSession.create({
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
