import {
  Association,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'

import { UserOneTimePassword } from './user-one-time-password'
import { UserPassword } from './user-password'
import { UserPasswordReset } from './user-password-reset'
import { UserSession } from './user-session'

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare static associations: {
    userOneTimePassword: Association<User, UserOneTimePassword>
    userPasswordResets: Association<User, UserPasswordReset>
    userPasswords: Association<User, UserPassword>
    userSessions: Association<User, UserSession>
  }

  declare email: string
  declare id: string
  declare userOneTimePasswords?: NonAttribute<UserOneTimePassword[]>
  declare userPasswordResets?: NonAttribute<UserPasswordReset[]>
  declare userPasswords?: NonAttribute<UserPassword[]>
  declare userSessions?: NonAttribute<UserSession[]>

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
        modelName: 'user',
        sequelize,
        underscored: true,
      },
    )
  }

  static relationship(): void {
    this.hasMany(UserOneTimePassword)
    this.hasMany(UserPassword)
    this.hasMany(UserPasswordReset)
    this.hasMany(UserSession)
  }
}
