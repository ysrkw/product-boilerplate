import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize'

export class Project extends Model<
  InferAttributes<Project>,
  InferCreationAttributes<Project>
> {
  declare id: CreationOptional<number>
  declare name: string
}

export function initProject(sequelize: Sequelize) {
  Project.init(
    {
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
    },
    {
      sequelize,
    },
  )
}
