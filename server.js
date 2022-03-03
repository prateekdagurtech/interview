require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
//const fs = require("fs");
const fileUpload = require("express-fileupload");

//App config
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(fileUpload());

//routes
// app.use("/api", require("./Routes/userProfileRoutes"));
app.use("/api", require("./Routes/userRoutes"));
app.use("/api", require("./Routes/PumpRoutes"));
app.use("/api", require("./Routes/userProfileRoutes"));

mongoose.connect(
	process.env.CON,
	{
		useNewUrlParser: true,
		//useCreateIndex: true,
		useUnifiedTopology: true,
		//useFindAndModify: false,
	},
	(err) => {
		if (err) throw err;
		console.log("connected to mongodb");
	},
);
//listener
if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
	});
}

//listener
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`listening port localhost : ${port}`);
});
