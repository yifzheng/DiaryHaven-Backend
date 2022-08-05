module.exports = (app) => {
	const entries = require("../controllers/entry.controller");
	const jwt = require("jsonwebtoken");
	require("dotenv").config();
	let router = require("express").Router();

	const checkAuth = (req, res, next) => {
		try {
			if (!req.headers.authorization) {
				return res.status(403).json({ error: "No credentials sent" });
			}
			const token = req.headers.authorization.split(" ")[1]; // taking the authorization token of {Bearer 'adasdasd'}
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
			req.userData = decodedToken;
			next();
		} catch (error) {
			return res.status(401).json({ error: "Invalid or expired" });
		}
	};

	// create a new entry
	app.post("/entries", checkAuth, entries.create);

	// get all entries
	app.get("/entries", entries.getAll);

	// get a entry by uuid
	app.get("/entries/:uuid", entries.getEntry);

	// update a entry by uuid
	app.put("/entries/:uuid", entries.update);

	//delete a entry by uuid
	app.delete("/entries/:uuid", entries.delete);

	app.use("/entries", router);
};
