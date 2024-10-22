import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'

import { Member } from './member'
import { Project } from './project'

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare email: string
  declare id: CreationOptional<number>
  declare members: NonAttribute<Member[]>
  declare name: string
  declare password: string
  declare projects: NonAttribute<Project[]>

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
    this.hasMany(Member)
    this.belongsToMany(Project, {
      through: Member,
    })
  }
}
