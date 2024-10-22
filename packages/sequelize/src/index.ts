import { Sequelize } from 'sequelize'

import { Project } from './project'
import { ProjectRole } from './project-role'
import { User } from './user'

export function initialize(sequelize: Sequelize): void {
  Project.initialize(sequelize)
  ProjectRole.initialize(sequelize)
  User.initialize(sequelize)
}

export { Project } from './project'
export { ProjectRole } from './project-role'
export { User } from './user'
