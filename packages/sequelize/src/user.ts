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
  declare name: string
  declare password: string
}

export function initUser(sequelize: Sequelize) {
  User.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING(),
        unique: true,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(),
      },
    },
    {
      sequelize,
    },
  )
}
