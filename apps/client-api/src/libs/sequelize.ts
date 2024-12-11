import { initialize } from '@repo/sequelize'
import { createNamespace } from 'cls-hooked'
import { Sequelize } from 'sequelize'

const namespace = createNamespace('client-api')

Sequelize.useCLS(namespace)

export const sequelize = new Sequelize({
  database: 'develop',
  dialect: 'mysql',
  host: '127.0.0.1',
  password: 'docker',
  port: 3306,
  username: 'docker',
})

initialize(sequelize)
