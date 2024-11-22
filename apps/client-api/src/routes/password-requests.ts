import { zValidator } from '@hono/zod-validator'
import { User, UserPasswordReset } from '@repo/sequelize'
import { Hono } from 'hono'
import { ulid } from 'ulid'
import z from 'zod'

import { MAIL_NO_REPLY } from '../constant'
import { transporter } from '../libs/nodemailer'
import { createExpiredAt } from '../utils/create-expired-at'

export const passwordRequests = new Hono().post(
  '/',
  zValidator(
    'form',
    z.object({
      email: z.string().email(),
    }),
  ),
  async (c) => {
    const body = c.req.valid('form')

    const user = await User.findOne({ where: { email: body.email } })

    if (user === null) return c.json({ ok: true })

    const passwordReset = await UserPasswordReset.create({
      expiredAt: createExpiredAt(),
      id: ulid(),
      userId: user.id,
    })

    const url = `http://localhost:3000/passwords/resets/${passwordReset.id}`

    await transporter.sendMail({
      from: MAIL_NO_REPLY,
      html: `<a href="${url}">${url}</a>`,
      to: user.email,
    })

    return c.json({ ok: true })
  },
)
