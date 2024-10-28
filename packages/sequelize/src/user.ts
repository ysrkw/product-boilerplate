import {
  Association,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'

import { Password } from './password'
import { PasswordRequest } from './password-request'
import { Session } from './session'

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare static associations: {
    passwordRequests: Association<User, PasswordRequest>
    passwords: Association<User, Password>
    sessions: Association<User, Session>
  }

  declare email: string
  declare id: string
  declare passwordRequests?: NonAttribute<PasswordRequest[]>
  declare passwords: NonAttribute<Password[]>
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
          primaryKey: true,
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
    this.hasMany(Password)
    this.hasMany(PasswordRequest)
    this.hasMany(Session)
  }
}
