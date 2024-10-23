import { getConnInfo } from '@hono/node-server/conninfo'
import { Session, User } from '@repo/sequelize'
import { verify } from 'argon2'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

export const sessions = new Hono()
  .get('/:id', async (c) => {
    const parameter = c.req.param()

    const session = await Session.findOne({
      where: {
        permalink: parameter.id,
      },
    })

    if (session === null) throw new HTTPException(400)

    return c.json({ session: { id: session.permalink } })
  })
  .post('/', async (c) => {
    const body = await c.req.json<{
      email: string
      password: string
    }>()

    const user = await User.findOne({
      where: {
        email: body.email,
      },
    })

    if (user === null) throw new HTTPException(400)

    const is_same_password = await verify(user.password, user.password)

    if (!is_same_password) throw new HTTPException(400)

    const info = getConnInfo(c)

    const session = await Session.create({
      expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      ipAddress: info.remote.address ?? '',
      permalink: crypto.randomUUID(),
      userId: user.id,
    })

    return c.json({ session: { id: session.permalink } })
  })
