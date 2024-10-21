import { Sequelize } from 'sequelize'

import { initProject, Project } from './project'
import { initProjectRole, ProjectRole } from './project-role'
import { initUser, User } from './user'

const sequelize = new Sequelize({
  define: {
    underscored: true,
  },
  dialect: 'sqlite',
  storage: 'dist/db.sqlite',
})

initProject(sequelize)
initProjectRole(sequelize)
initUser(sequelize)

Project.belongsToMany(User, { through: ProjectRole })
User.belongsToMany(Project, { through: ProjectRole })

export { sequelize }

export { Project } from './project'
export { ProjectRole } from './project-role'
export { User } from './user'
