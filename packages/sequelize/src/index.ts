import { Sequelize } from 'sequelize'

import { Member } from './member'
import { Project } from './project'
import { User } from './user'

export function initialize(sequelize: Sequelize): void {
  Member.initialize(sequelize)
  Project.initialize(sequelize)
  User.initialize(sequelize)
}

export { Member } from './member'
export { Project } from './project'
export { User } from './user'
