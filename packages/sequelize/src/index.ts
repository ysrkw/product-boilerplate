import { Sequelize } from 'sequelize'

import { PasswordRequest } from './password-request'
import { Session } from './session'
import { User } from './user'

export function initialize(sequelize: Sequelize): void {
  PasswordRequest.initialize(sequelize)
  Session.initialize(sequelize)
  User.initialize(sequelize)

  PasswordRequest.relationship()
  Session.relationship()
  User.relationship()
}

export { PasswordRequest } from './password-request'
export { Session } from './session'
export { User } from './user'
