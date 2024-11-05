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

import { User } from './user'

export class UserPasswordReset extends Model<
  InferAttributes<UserPasswordReset>,
  InferCreationAttributes<UserPasswordReset>
> {
  declare static associations: {
    user: Association<UserPasswordReset, User>
  }

  declare expiredAt: Date
  declare id: string
  declare user?: NonAttribute<User>
  declare userId: ForeignKey<User['id']>

  static initialize(sequelize: Sequelize): void {
    this.init(
      {
        expiredAt: {
          allowNull: false,
          type: DataTypes.DATE(),
        },
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.STRING(),
        },
        userId: {
          allowNull: false,
          type: DataTypes.STRING(),
        },
      },
      {
        indexes: [{ fields: ['user_id'], unique: false }],
        modelName: 'userPasswordReset',
        sequelize,
        underscored: true,
      },
    )
  }

  static relationship(): void {
    this.belongsTo(User, { onDelete: 'CASCADE' })
  }
}
