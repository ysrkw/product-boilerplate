import { Sequelize } from 'sequelize'

import { Password } from './password'
import { PasswordReset } from './password-reset'
import { Session } from './session'
import { User } from './user'

export function initialize(sequelize: Sequelize): void {
  Password.initialize(sequelize)
  PasswordReset.initialize(sequelize)
  Session.initialize(sequelize)
  User.initialize(sequelize)

  Password.relationship()
  PasswordReset.relationship()
  Session.relationship()
  User.relationship()
}

export { Password } from './password'
export { PasswordReset } from './password-reset'
export { Session } from './session'
export { User } from './user'
