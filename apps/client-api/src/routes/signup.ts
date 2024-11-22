import { getConnInfo } from '@hono/node-server/conninfo'
import { zValidator } from '@hono/zod-validator'
import { User, UserPassword, UserSession } from '@repo/sequelize'
import argon2 from 'argon2'
import { Hono } from 'hono'
import { setSignedCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { ulid } from 'ulid'
import { z } from 'zod'

import { MAIL_NO_REPLY, SESSION_NAME, SESSION_SECRET } from '../constant'
import { transporter } from '../libs/nodemailer'
import { sequelize } from '../libs/sequelize'
import { createExpiredAt } from '../utils/create-expired-at'

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

      await UserPassword.create({
        hash,
        id: ulid(),
        registeredAt: new Date(),
        userId: user.id,
      })

      const session = await UserSession.create({
        expiredAt: createExpiredAt(),
        id: ulid(),
        ipAddress: info.remote.address ?? '',
        userId: user.id,
      })

      return { session, user }
    })

    await transporter.sendMail({
      from: MAIL_NO_REPLY,
      text: 'Hello World',
      to: user.email,
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
