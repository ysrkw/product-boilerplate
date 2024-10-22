import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'

import { Member } from './member'
import { User } from './user'

export class Project extends Model<
  InferAttributes<Project>,
  InferCreationAttributes<Project>
> {
  declare static associations: {
    members: Association<Project, Member>
    users: Association<Project, User>
  }

  declare id: CreationOptional<number>
  declare members?: NonAttribute<Member[]>
  declare name: string
  declare permalink: string
  declare users?: NonAttribute<User[]>

  static initialize(sequelize: Sequelize): void {
    this.init(
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
        permalink: {
          allowNull: false,
          type: DataTypes.STRING(),
          unique: true,
        },
      },
      {
        sequelize,
        underscored: true,
      },
    )
  }

  static relationship(): void {
    this.hasMany(Member)
    this.belongsToMany(User, { through: Member })
  }
}
