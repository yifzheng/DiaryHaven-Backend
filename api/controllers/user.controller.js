const { User} = require("../../models");

// POST -> create a new user
exports.create = async (req, res) => {
	const { firstName, lastName, email, password, role } = req.body;
	// validate request body
	if (!firstName || !lastName || !email || !password || !role) {
		res.status(400).send({ message: "Request body cannot be empty!" });
	}

	// create a new User
	try {
		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
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
		const users = await User.findAll({ include: "entry" });

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
		const user = await User.findOne({ where: { uuid }, include: "entry" });

		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};

// PUT -> update user by uuid
exports.update = async (req, res) => {
	const uuid = req.params.uuid;
	const { firstName, lastName, email, password, role } = req.body;
	try {
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
		const user = await User.findOne({ where: { uuid } });

		await user.destory();

		return res.json({ message: "User Deleted" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};
