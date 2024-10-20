import { Sequelize } from 'sequelize'

import { initUser } from './user'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'dist/db.sqlite',
})

initUser(sequelize)

export { sequelize }

export { User } from './user'
