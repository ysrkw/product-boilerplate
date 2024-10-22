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

export class PasswordRequest extends Model<
  InferAttributes<PasswordRequest>,
  InferCreationAttributes<PasswordRequest>
> {
  declare id: string
  declare permalink: string
  declare user: NonAttribute<User>
  declare userId: ForeignKey<User['id']>

  static initialize(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.STRING(),
        },
        permalink: {
          allowNull: false,
          type: DataTypes.STRING(),
          unique: true,
        },
        userId: {
          allowNull: false,
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
