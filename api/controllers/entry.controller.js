const { User, Entry } = require("../../models");

// POST -> create a new post
exports.create = async (req, res) => {
	const { title, body, userUuid } = req.body;
	// validate request body
	if (!title || !body || !userUuid) {
		res.status(400).send({ message: "Request body cannot be empty!" });
	}

	// create a new User
	try {
		const user = await User.findOne({ where: { uuid: userUuid } });
    
		const entry = await Entry.create({
			title,
			body,
			userId: user.id,
		});

		return res.json(entry);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};

// GET -> get all entries
exports.getAll = async (req, res) => {
	try {
		const entries = await Entry.findAll({ include: "user" });

		return res.json(entries);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};

// GET -> get a user by uuid
exports.getEntry = async (req, res) => {
	const uuid = req.params.uuid;
	try {
		const entry = await Entry.findOne({ where: { uuid }, include: "user" });

		return res.json(entry);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};

// PUT -> update user by uuid
exports.update = async (req, res) => {
	const uuid = req.params.uuid;

	try {
		await Entry.update(req.body, { where: { uuid } }).then((num) => {
			if (num == 1) {
				res.json({ message: "Entry successfully updated" });
			} else {
				res.json({ message: "Cannot update entry" });
			}
		});

	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};

//DELETE
exports.delete = async (req, res) => {
	const uuid = req.params.uuid;
	try {
		const entry = await Entry.findOne({ where: { uuid } });

		await entry.destory();

		return res.json({ message: "Entry Deleted" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Something went wrong" });
	}
};
