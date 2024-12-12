import { initialize } from '@repo/sequelize'
import { createNamespace } from 'cls-hooked'
import { Sequelize } from 'sequelize'

const namespace = createNamespace('client-api')

Sequelize.useCLS(namespace)

export const sequelize = new Sequelize(
  'mysql://docker:docker@127.0.0.1:3306/develop',
)

initialize(sequelize)
