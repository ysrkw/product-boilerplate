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

export class UserPassword extends Model<
  InferAttributes<UserPassword>,
  InferCreationAttributes<UserPassword>
> {
  declare static associations: {
    user: Association<UserPassword, User>
  }

  declare hash: string
  declare id: string
  declare registeredAt: Date
  declare user?: NonAttribute<User>
  declare userId: ForeignKey<User['id']>

  static initialize(sequelize: Sequelize): void {
    this.init(
      {
        hash: {
          allowNull: false,
          type: DataTypes.STRING(),
        },
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.STRING(),
        },
        registeredAt: {
          allowNull: false,
          type: DataTypes.DATE(),
        },
        userId: {
          allowNull: false,
          type: DataTypes.STRING(),
        },
      },
      {
        indexes: [{ fields: ['user_id'], unique: false }],
        modelName: 'userPassword',
        sequelize,
        underscored: true,
      },
    )
  }

  static relationship(): void {
    this.belongsTo(User, { onDelete: 'CASCADE' })
  }
}
