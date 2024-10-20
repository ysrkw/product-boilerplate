import { Sequelize } from 'sequelize'
import { initUser, User } from './user'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'dist/db.sqlite',
})

initUser(sequelize)

export { sequelize, User }
