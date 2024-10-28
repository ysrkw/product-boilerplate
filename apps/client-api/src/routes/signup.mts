import { getConnInfo } from '@hono/node-server/conninfo'
import { zValidator } from '@hono/zod-validator'
import { Password, Session, User } from '@repo/sequelize'
import argon2 from 'argon2'
import { Hono } from 'hono'
import { setSignedCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { ulid } from 'ulid'
import { z } from 'zod'

import { SESSION_NAME, SESSION_SECRET } from '../constant.mjs'
import { sequelize } from '../database.mjs'
import { createExpiredAt } from '../utils/create-expired-at.mjs'

export const signup = new Hono().post(
  '/',
  zValidator(
    'form',
    z.object({
      email: z.string().email(),
      password: z.string().min(8).max(80),
      privacyPolicy: z.enum(['on']),
      termsOfService: z.enum(['on']),
    }),
  ),
  async (c) => {
    const body = c.req.valid('form')

    const count = await User.count({ where: { email: body.email } })

    if (count > 0) throw new HTTPException(401)

    const hash = await argon2.hash(body.password)

    const info = getConnInfo(c)

    const { session, user } = await sequelize.transaction(async () => {
      const user = await User.create({
        email: body.email,
        id: ulid(),
      })

      await Password.create({
        hash,
        id: ulid(),
        userId: user.id,
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

    return c.json({ user })
  },
)
