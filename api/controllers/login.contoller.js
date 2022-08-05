const { User } = require("../../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// POST -> Login
exports.login = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	try {
		console.log("inside login function");
		// find the user with req body
		const checkedUser = await User.findOne({
			where: { email },
		});
		// check if user exists
		if (!checkedUser) {
			return res.status(401).json({
				message: `A user with name: ${firstName} ${lastName} and email: ${email} does not exist`,
			});
		}
		const result = bcryptjs.compare(password, checkedUser.password);
		// if there is a result, create a jwt token
		if (result) {
			const token = jwt.sign(
				{
					firstName: checkedUser.firstName,
					lastName: checkedUser.lastName,
					email: checkedUser.email,
				},
				process.env.JWT_SECRET
			);
			// return user data and token
			return res.status(200).json({
				message: "Authentication Successful",
				userUuid: checkedUser.uuid,
				firstName: checkedUser.firstName,
				lastName: checkedUser.lastName,
				email: checkedUser.email,
				token,
			});
		}
		return res.status(401).json({ message: "Wrong password" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ error: "Something went wrong logging in" });
	}
};
