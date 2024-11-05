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

export class UserOneTimePassword extends Model<
  InferAttributes<UserOneTimePassword>,
  InferCreationAttributes<UserOneTimePassword>
> {
  declare static associations: {
    user: Association<UserOneTimePassword, User>
  }

  declare token: string
  declare user?: NonAttribute<User>
  declare userId: ForeignKey<User['id']>

  static initialize(sequelize: Sequelize): void {
    this.init(
      {
        token: {
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
        modelName: 'userOneTimePassword',
        sequelize,
        underscored: true,
      },
    )
  }

  static relationship(): void {
    this.belongsTo(User, { onDelete: 'CASCADE' })
  }
}
