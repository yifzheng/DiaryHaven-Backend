"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Entry }) {
			// define association here
			this.hasMany(Entry, { foreignKey: "userId", as: "entry" });
		}

		toJSON() {
			return { ...this.get(), id: undefined };
		}
	}
	User.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have first name" },
					notEmpty: { msg: "First name must not be empty" },
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have last name" },
					notEmpty: { msg: "Last name must not be empty" },
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have email" },
					notEmpty: { msg: "Email must not be empty" },
					isEmail: { msg: "Must be a valid email address" },
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have password" },
					notEmpty: { msg: "Password must not be empty" },
				},
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "User must have role" },
					notEmpty: { msg: "Role must not be empty" },
				},
			},
		},
		{
			sequelize,
			tableName: "users",
			modelName: "User",
		}
	);
	return User;
};
