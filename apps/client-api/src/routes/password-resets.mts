import { zValidator } from '@hono/zod-validator'
import { Password, PasswordReset } from '@repo/sequelize'
import argon2 from 'argon2'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ulid } from 'ulid'
import { z } from 'zod'

import { sequelize } from '../libs/sequelize.mjs'

export const passwordResets = new Hono()
  .get('/:resetId', async (c) => {
    const parameter = c.req.param()

    const passwordReset = await PasswordReset.findByPk(parameter.resetId)

    if (passwordReset === null) return c.json({ ok: false })

    const ok = passwordReset.expiredAt.getTime() > Date.now()

    return c.json({ ok })
  })
  .post(
    '/:resetId',
    zValidator(
      'form',
      z.object({
        password: z.string().min(8).max(80),
      }),
    ),
    async (c) => {
      const parameter = c.req.param()
      const body = c.req.valid('form')

      const passwordReset = await PasswordReset.findByPk(parameter.resetId)

      if (passwordReset === null) throw new HTTPException(400)

      const hash = await argon2.hash(body.password)

      await sequelize.transaction(async () => {
        await Password.create({
          hash,
          id: ulid(),
          registeredAt: new Date(),
          userId: passwordReset.userId,
        })

        await PasswordReset.destroy({
          where: {
            id: parameter.resetId,
          },
        })
      })

      return c.json({ ok: true })
    },
  )
