import { getConnInfo } from '@hono/node-server/conninfo'
import { Session, User } from '@repo/sequelize'
import { verify } from 'argon2'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ulid } from 'ulid'

import { createExpiredAt } from '../utils/create-expired-at'

export const sessions = new Hono()
  .get('/:id', async (c) => {
    const parameter = c.req.param()

    const session = await Session.findByPk(parameter.id)

    if (session === null) throw new HTTPException(400)

    return c.json({ session })
  })
  .post('/', async (c) => {
    const body = await c.req.json<{ email: string; password: string }>()

    const user = await User.findOne({ where: { email: body.email } })

    if (user === null) throw new HTTPException(400)

    const verifiedPassword = await verify(user.passwordHash, body.password)

    if (!verifiedPassword) throw new HTTPException(400)

    const info = getConnInfo(c)

    const session = await Session.create({
      expiredAt: createExpiredAt(),
      id: ulid(),
      ipAddress: info.remote.address ?? '',
      userId: user.id,
    })

    return c.json({ session, user })
  })
