import { getConnInfo } from '@hono/node-server/conninfo'
import { Session, User } from '@repo/sequelize'
import { hash } from 'argon2'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ulid } from 'ulid'

import { sequelize } from '../database'
import { createExpiredAt } from '../utils/create-expired-at'

export const register = new Hono().post('/', async (c) => {
  const body = await c.req.json<{ email: string; password: string }>()

  const count = await User.count({ where: { email: body.email } })

  if (count > 0) throw new HTTPException(400)

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

  return c.json({ session, user })
})
