module.exports = (app) => {
	const auth = require("../controllers/login.contoller");
	let router = require("express").Router();

	app.post("/login", auth.login);

	app.use("/login", router);
};
