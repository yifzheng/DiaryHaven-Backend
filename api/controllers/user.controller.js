const { User } = require("../../models");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

// POST -> create a new user
exports.create = async (req, res) => {
	const { firstName, lastName, email, password, role } = req.body;
	// validate request body
	if (!firstName || !lastName || !email || !password || !role) {
		res.status(400).send({ message: "Request body cannot be empty!" });
	}

	// check if user is already in database, if no create a new User
	try {
		// check if user is alrady made
		const checkUser = await User.findOne({ where: { email } });
		if (checkUser) {
			return res.status(409).json({
				message: "User already exists in database",
			});
		}
		// encrypt password
		const salt = await bcryptjs.genSalt(10);
		const newPassword = await bcryptjs.hash(password, salt);
		// create user
		const user = await User.create({
			firstName,
			lastName,
			email,
			password: newPassword,
			role,
		});

		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};

// GET -> get all users
exports.getAll = async (req, res) => {
	try {
		// find all users
		const users = await User.findAll({ include: "entry" });
		// return users
		return res.json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};

// GET -> get a user by uuid
exports.getUser = async (req, res) => {
	const uuid = req.params.uuid;
	try {
		// find user by uuid
		const user = await User.findOne({ where: { uuid }, include: "entry" });
		// return user
		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};

// PUT -> update user by uuid
exports.update = async (req, res) => {
	const uuid = req.params.uuid;
	const { firstName, lastName, email, password, role } = req.body; // deconstruct req body
	try {
		// update user
		await User.update(req.body, { where: { uuid } }).then((num) => {
			if (num == 1) {
				res.json({ message: "User successfully updated" });
			} else {
				res.json({ message: "Cannot update user" });
			}
		});

		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};

//DELETE
exports.delete = async (req, res) => {
	const uuid = req.params.uuid;
	try {
		// find user
		const user = await User.findOne({ where: { uuid } });
		// delete user
		await user.destory();

		return res.json({ message: "User Deleted" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};
