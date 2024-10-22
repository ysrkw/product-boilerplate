import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'

import { Member } from './member'
import { PasswordRequest } from './password-request'
import { Project } from './project'
import { Session } from './session'

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare static associations: {
    members: Association<User, Member>
    passwordRequests: Association<User, PasswordRequest>
    projects: Association<User, Project>
    sessions: Association<User, Session>
  }

  declare email: string
  declare id: CreationOptional<number>
  declare members?: NonAttribute<Member[]>
  declare name: string
  declare password: string
  declare passwordRequests?: NonAttribute<PasswordRequest[]>
  declare permalink: string
  declare projects?: NonAttribute<Project[]>
  declare sessions?: NonAttribute<Session[]>

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
        permalink: {
          allowNull: false,
          type: DataTypes.STRING(),
          unique: true,
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
    this.hasMany(PasswordRequest)
    this.belongsToMany(Project, { through: Member })
    this.hasMany(Session)
  }
}
