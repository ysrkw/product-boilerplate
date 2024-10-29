import { zValidator } from '@hono/zod-validator'
import { User } from '@repo/sequelize'
import { Hono } from 'hono'
import nodemailer from 'nodemailer'
import z from 'zod'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export const passwordRequest = new Hono().post(
  '/',
  zValidator(
    'form',
    z.object({
      email: z.string().email(),
    }),
  ),
  async (c) => {
    const { email } = c.req.valid('form')

    const user = await User.findOne({ where: { email } })

    if (user === null) return c.json({ ok: true })

    const transporter = nodemailer.createTransport({
      host: '127.0.0.1',
      port: 1025,
      secure: false,
    })

    await transporter.sendMail({
      from: 'no-reply@example.com',
      text: 'Hello World',
      to: user.email,
    })

    return c.json({ ok: true })
  },
)
