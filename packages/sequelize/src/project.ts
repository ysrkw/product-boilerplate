import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize'

import { ProjectRole } from './project-role'
import { User } from './user'

export class Project extends Model<
  InferAttributes<Project>,
  InferCreationAttributes<Project>
> {
  declare id: CreationOptional<number>
  declare name: string

  static initialize(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER(),
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING(),
        },
      },
      {
        sequelize,
        underscored: true,
      },
    )
  }

  static relationship(): void {
    this.hasMany(ProjectRole)
    this.belongsToMany(User, {
      through: ProjectRole,
    })
  }
}
