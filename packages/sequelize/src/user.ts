import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize'

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare email: string
  declare id: CreationOptional<number>
  declare password: string
}

export function initUser(sequelize: Sequelize) {
  User.init(
    {
      email: {
        type: DataTypes.STRING(),
        unique: true,
      },
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(),
      },
      password: {
        type: DataTypes.STRING(),
      },
    },
    {
      sequelize,
    },
  )
}
