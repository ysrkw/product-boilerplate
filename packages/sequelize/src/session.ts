import {
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'

import { User } from './user'

export class Session extends Model<
  InferAttributes<Session>,
  InferCreationAttributes<Session>
> {
  declare expiredAt: Date
  declare id: number
  declare permalink: string
  declare user: NonAttribute<User>
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
          type: DataTypes.INTEGER(),
        },
        permalink: {
          allowNull: false,
          type: DataTypes.STRING(),
          unique: true,
        },
        userId: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.INTEGER(),
        },
      },
      {
        indexes: [{ fields: ['user_id'], unique: false }],
        sequelize,
        underscored: true,
      },
    )
  }

  static relationship(): void {
    this.belongsTo(User, { onDelete: 'CASCADE' })
  }
}
