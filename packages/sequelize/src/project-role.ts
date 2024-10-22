import {
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'

import { Project } from './project'
import { User } from './user'

export class ProjectRole extends Model<
  InferAttributes<ProjectRole>,
  InferCreationAttributes<ProjectRole>
> {
  declare project: NonAttribute<Project>
  declare projectId: ForeignKey<Project['id']>
  declare user: NonAttribute<User>
  declare userId: ForeignKey<User['id']>

  static initialize(sequelize: Sequelize): void {
    this.init(
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
        underscored: true,
      },
    )
  }

  static relationship(): void {
    this.belongsTo(Project)
    this.belongsTo(User)
  }
}
