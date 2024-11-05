import { Sequelize } from 'sequelize'

import { User } from './user'
import { UserOneTimePassword } from './user-one-time-password'
import { UserPassword } from './user-password'
import { UserPasswordReset } from './user-password-reset'
import { UserSession } from './user-session'

export function initialize(sequelize: Sequelize): void {
  User.initialize(sequelize)
  UserOneTimePassword.initialize(sequelize)
  UserPassword.initialize(sequelize)
  UserPasswordReset.initialize(sequelize)
  UserSession.initialize(sequelize)

  User.relationship()
  UserOneTimePassword.relationship()
  UserPassword.relationship()
  UserPasswordReset.relationship()
  UserSession.relationship()
}

export { User } from './user'
export { UserOneTimePassword } from './user-one-time-password'
export { UserPassword } from './user-password'
export { UserPasswordReset } from './user-password-reset'
export { UserSession } from './user-session'
