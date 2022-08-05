const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

//simple route: HOME
app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to Diary Haven!" });
});

//routes of api
require("./api/routes/user.routes")(app);
require("./api/routes/entry.routes")(app);

app.listen(PORT, async () => {
	console.log(`Server running on port ${PORT}`);
	await sequelize.authenticate();
	console.log("Database Connected");
});
