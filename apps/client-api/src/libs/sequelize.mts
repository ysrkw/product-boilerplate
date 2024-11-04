import { initialize } from '@repo/sequelize'
import { createNamespace } from 'cls-hooked'
import { Sequelize } from 'sequelize'

const namespace = createNamespace('client-api')

Sequelize.useCLS(namespace)

export const sequelize = new Sequelize('sqlite://dist/db.sqlite')

initialize(sequelize)
