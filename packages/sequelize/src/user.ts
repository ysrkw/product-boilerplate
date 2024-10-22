import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize'

import { Project } from './project'
import { ProjectRole } from './project-role'

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare email: string
  declare id: CreationOptional<number>
  declare name: string
  declare password: string

  static initialize(sequelize: Sequelize): void {
    this.init(
      {
        email: {
          allowNull: false,
          type: DataTypes.STRING(),
          unique: true,
        },
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
        password: {
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
    this.belongsToMany(Project, {
      through: ProjectRole,
    })
  }
}
