import {
  Association,
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

export class Member extends Model<
  InferAttributes<Member>,
  InferCreationAttributes<Member>
> {
  declare static associations: {
    project: Association<Member, Project>
    user: Association<Member, User>
  }

  declare project?: NonAttribute<Project>
  declare projectId: ForeignKey<Project['id']>
  declare user?: NonAttribute<User>
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
    this.belongsTo(Project, { onDelete: 'CASCADE' })
    this.belongsTo(User, { onDelete: 'CASCADE' })
  }
}
