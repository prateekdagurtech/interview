const userProfileMod = require("../Model/userProfile");
const User = require("../Model/userModel");

const createUserProfileFactory = {
	//Function to create ico.
	createProfileDetails: async (req, res) => {
		try {
			console.log("11111111111111111111111");
			// const id = req.params.userid;
			// const user = await User.findOne({ _id: id });
			// console.log(user.name, "nnnnnnnnnnnnnnnnnnnnn");
			//Saving ico in database.
			const profile = new userProfileMod({
				name: req.body.name,
				address: req.body.address,
				email: req.body.email,
				// image,
			});
			await profile.save();
			res.json("Profile is created successfully!");
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to get all ico.
	getprofile: async (req, res) => {
		try {
			const user_id = req.params.userid;
			//Reading ico.
			const pump_factory = await userProfileMod
				.findOne({ _id: user_id })
				.populate({ path: "ipumpDetals" });
			if (!pump_factory) {
				res.json({ message: "invalid user" });
			}
			res.json({ pumpFactory: pump_factory });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

// forgotPassword: async (req, res) => {
// 	try {
// 		const { email } = req.body;
// 		const user = await User.findOne({ email });
// 		if (!user) {
// 			return res.status(400).json({ msg: "user does not exist" });
// 		}
// 		//Saving user.

// 		const token = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD, {
// 			expiresIn: "20m",
// 		});

// 		const sendgridAPIKey = process.env.sendgrid_KEY;
// 		console.log(sendgridAPIKey);
// 		sgMail.setApiKey(sendgridAPIKey);
// 		const sendGridMail = (email) => {
// 			sgMail.send({
// 				to: email,
// 				from: "prateekdagur8@gmail.com",
// 				subject: "Sending with SendGrid",
// 				html: `${process.env.URL}/resetpassword/${token}`,
// 			});
// 		};

// 		const update_resetLink = await User.updateOne(
// 			{ resetLink: token },
// 			{ _id: user._id },
// 		);
// 		if (!update_resetLink) {
// 			return res.status(400).json({ msg: "Link error" });
// 		} else {
// 			sendGridMail(user.email);
// 		}
// 		res.json({ msg: "email has been sent" });
// 	} catch (err) {
// 		return res.status(500).json({ msg: err.message });
// 	}
// },

// resetPassword: async (req, res) => {
// 	try {
// 		const resetLink = req.params.resetLink;
// 		const { password, confirmPassword } = req.body;

// 		if (password != confirmPassword) {
// 			return res
// 				.status(400)
// 				.json({ msg: "password should match confirm password" });
// 		}
// 		jwt.verify(resetLink, process.env.RESET_PASSWORD, (err, user) => {
// 			if (err) {
// 				return res
// 					.status(400)
// 					.json({ msg: "Incorrect Token or it is expired" });
// 			}
// 		});
// 		const user = await User.findOne({ resetLink });
// 		if (!user) {
// 			return res
// 				.status(400)
// 				.json({ msg: "user with this token does not exist" });
// 		}
// 		const update = await User.findOne(
// 			{ _id: user._id },
// 			{
// 				password: password,
// 				resetLink: "",
// 			},
// 		);

// 		res.json({
// 			msg: "user password is updated created",
// 		});
// 	} catch (err) {
// 		return res.status(500).json({ msg: err.message });
// 	}
// },

module.exports = createUserProfileFactory;
