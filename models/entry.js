"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Entry extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User }) {
			// define association here
			this.belongsTo(User, { foreignKey: "userId", as: "user" });
		}

		toJson() {
			return { ...this.get(), id: undefined, userId: undefined };
		}
	}
	Entry.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: "Entry title must not be empty" },
					notNull: { msg: "Entry title must not be null" },
				},
			},
			body: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: "Entry title must not be empty" },
					notNull: { msg: "Entry title must not be null" },
				},
			},
		},
		{
			sequelize,
			tableName: "entries",
			modelName: "Entry",
		}
	);
	return Entry;
};
