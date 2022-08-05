module.exports = (app) => {
	const entries = require("../controllers/entry.controller");
	let router = require("express").Router();

	// create a new user
	app.post("/entries", entries.create);

	// get all entries
	app.get("/entries", entries.getAll);

	// get a user by uuid
	app.get("/entries/:uuid", entries.getEntry);

	// update a user by uuid
	app.put("/entries/:uuid", entries.update);

	//delete a user by uuid
	app.delete("/entries/:uuid", entries.delete);

	app.use("/entries", router);
};
