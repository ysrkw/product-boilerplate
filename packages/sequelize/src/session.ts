import {
  Association,
  CreationOptional,
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
  declare static associations: {
    user: Association<Session, User>
  }

  declare expiredAt: Date
  declare id: CreationOptional<number>
  declare ipAddress: string
  declare permalink: string
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
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER(),
        },
        ipAddress: {
          allowNull: false,
          type: DataTypes.STRING(),
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
