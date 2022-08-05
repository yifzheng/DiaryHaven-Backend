module.exports = (app) => {
	const users = require("../controllers/user.controller");
	let router = require("express").Router();

	// create a new user
	app.post("/users", users.create);

	// get all users
	app.get("/users", users.getAll);

	// get a user by uuid
	app.get("/users/:uuid", users.getUser);

	// update a user by uuid
	app.put("/users/:uuid", users.update);

	//delete a user by uuid
	app.delete("/users/:uuid", users.delete);

	app.use("/users", router);
};
