import { Sequelize } from 'sequelize'

import { Member } from './member'
import { PasswordRequest } from './password-request'
import { Project } from './project'
import { Session } from './session'
import { User } from './user'

export function initialize(sequelize: Sequelize): void {
  Member.initialize(sequelize)
  PasswordRequest.initialize(sequelize)
  Project.initialize(sequelize)
  Session.initialize(sequelize)
  User.initialize(sequelize)

  Member.relationship()
  PasswordRequest.relationship()
  Project.relationship()
  Session.initialize(sequelize)
  User.relationship()
}

export { Member } from './member'
export { Project } from './project'
export { User } from './user'
