const User = require("../Model/userModel");
const accessToken = require("../Model/access_token");
const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("mySecretKey");

const userController = {
	//Function to register the user.
	register: async (req, res) => {
		try {
			console.log("111111111111111111111111111111111");
			const { name, email, password } = req.body;
			const user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: "this user is already exists." });
			}
			console.log(password, "pppppppppppppppppp");
			const encryptedStringPassword = cryptr.encrypt(password);
			//Saving user.
			const newUser = new User({
				name: name,
				email: email,
				password: encryptedStringPassword,
			});
			await newUser.save();
			if (newUser == 0) {
				return res.status(400).json({ msg: "There is some problem!" });
			}
			res.json({
				msg: "Register Success",
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to login user.
	login: async (req, res) => {
		try {
			console.log("222222222222222222222222222");
			const { email, password } = req.body;
			//Finding user's email.
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: "user is not exist" });
			}
			const decryptedString = cryptr.decrypt(user.password);
			if (decryptedString != password) {
				return res.status(400).json({ msg: "Incorrect password" });
			}
			//Creating access token.
			const accesstoken = createAccessToken({ id: user._id });
			console.log(accesstoken, "aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
			const data1 = await accessToken.findOne({ user_id: user._id });
			if (data1) {
				console.log("startttttttttttttttttttttttt");
				const data2 = await accessToken.findOneAndUpdate(
					{ user_id: user._id },
					{
						access_token: accesstoken,
					},
					{
						new: true,
					},
				);
				console.log(data2, "dddddd22222222222222222222222");
				res.json({
					msg: "Login Success",
					data2: data2,
					// role: user.role,
					// user: {
					// 	...user._doc,
					// 	password: " ",
					// },
				});
			}
			if (!data1) {
				const data3 = new accessToken({
					user_id: user._id,
					access_token: accesstoken,
				});
				console.log(data3, "dddddddddddddddddddddd");
				await data3.save();
				res.json({
					msg: "Login Success",
					data3: data3,
					// role: user.role,
					// user: {
					// 	...user._doc,
					// 	password: " ",
					// },
				});
			}
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to logout user.
	// logout: async (req, res) => {
	// 	try {
	// 		res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
	// 		return res.json({ msg: "logged out" });
	// 	} catch (err) {
	// 		return res.status(500).json({ msg: err.message });
	// 	}
	// },
	//Function to check the refresh token.
	// refreshToken: (req, res) => {
	// 	try {
	// 		const rf_token = req.cookies.refreshtoken;
	// 		if (!rf_token) {
	// 			return res.status(400).json({ msg: "please login first" });
	// 		}
	// 		//Verifying jwt token
	// 		jwt.verify(
	// 			rf_token,
	// 			process.env.REFRESH_TOKEN_SECRET,
	// 			async (err, result) => {
	// 				if (err) {
	// 					return res.status(400).json({ msg: "please login first" });
	// 				}
	// 				if (!result) {
	// 					return res.status(400).json({ msg: "user does not exist" });
	// 				}
	// 				const user = await User.findById(result.id);
	// 				const access_token = createAccessToken({ id: user.id });
	// 				res.json({
	// 					access_token,
	// 					role: user.role,
	// 					user: {
	// 						...user._doc,
	// 						password: " ",
	// 					},
	// 				});
	// 			},
	// 		);
	// 	} catch (err) {
	// 		return res.status(500).json({ msg: err.message });
	// 	}
	// },
	// //Function to get the user
	// getUser: async (req, res) => {
	// 	try {
	// 		const user = await User.findById(req.user.id);
	// 		if (!user) {
	// 			return res.status(400).json({ msg: "user does not exist" });
	// 		}
	// 		res.json(user);
	// 	} catch (err) {
	// 		return res.status(500).json({ msg: err.message });
	// 	}
	// },
};

//Function to to create access token.
const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

//Function to to create refresh token.
// const createRefreshToken = (user) => {
// 	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
// };

module.exports = userController;
