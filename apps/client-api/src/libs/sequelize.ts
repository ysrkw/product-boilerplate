import { initialize } from '@repo/sequelize'
import { createNamespace } from 'cls-hooked'
import { Sequelize } from 'sequelize'

const namespace = createNamespace('client-api')

Sequelize.useCLS(namespace)

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'develop',
  username: 'docker',
  password: 'docker',
})

initialize(sequelize)
