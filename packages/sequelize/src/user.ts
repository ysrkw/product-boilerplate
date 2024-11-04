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
import { PasswordReset } from './password-reset'
import { Session } from './session'

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare static associations: {
    passwordResets: Association<User, PasswordReset>
    passwords: Association<User, Password>
    sessions: Association<User, Session>
  }

  declare email: string
  declare id: string
  declare passwordResets?: NonAttribute<PasswordReset[]>
  declare passwords?: NonAttribute<Password[]>
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
        modelName: 'user',
        sequelize,
        underscored: true,
      },
    )
  }

  static relationship(): void {
    this.hasMany(Password)
    this.hasMany(PasswordReset)
    this.hasMany(Session)
  }
}
