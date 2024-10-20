import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  Sequelize,
  DataTypes,
} from 'sequelize'

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>
  declare email: string
  declare password: string
}

export function initUser(sequelize: Sequelize) {
  User.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(),
      },
      email: {
        type: DataTypes.STRING(),
        unique: true,
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
