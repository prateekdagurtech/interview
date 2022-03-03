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

module.exports = createUserProfileFactory;
