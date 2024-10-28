import { Sequelize } from 'sequelize'

import { Password } from './password'
import { PasswordRequest } from './password-request'
import { Session } from './session'
import { User } from './user'

export function initialize(sequelize: Sequelize): void {
  Password.initialize(sequelize)
  PasswordRequest.initialize(sequelize)
  Session.initialize(sequelize)
  User.initialize(sequelize)

  Password.relationship()
  PasswordRequest.relationship()
  Session.relationship()
  User.relationship()
}

export { Password } from './password'
export { PasswordRequest } from './password-request'
export { Session } from './session'
export { User } from './user'
