import { initialize } from '@repo/sequelize'
import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('sqlite://dist/db.sqlite')

initialize(sequelize)
