import {
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize'

import { Project } from './project'
import { User } from './user'

export class ProjectRole extends Model<
  InferAttributes<ProjectRole>,
  InferCreationAttributes<ProjectRole>
> {
  declare projectId: ForeignKey<Project['id']>
  declare userId: ForeignKey<User['id']>
}

export function initProjectRole(sequelize: Sequelize) {
  ProjectRole.init(
    {
      projectId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER(),
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER(),
      },
    },
    {
      sequelize,
    },
  )
}
