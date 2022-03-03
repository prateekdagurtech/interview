const pumpMod = require("../Model/pumpModel");
const userProfileMod = require("../Model/userProfile");

const createPumpDetailsFactory = {
	//Function to create ico.
	createPumpDetails: async (req, res) => {
		try {
			console.log("1111111111111111111111111");
			// const { vehicle_name, pump_details } = req.body;

			// //Saving ico in database.
			// const pump = new pumpMod({
			// 	vehicle_name,
			// 	pump_details,
			// });
			// await pump.save();
			// res.json("Token is created successfully!");

			const user_id = req.params.user_id;
			// const pump = new pumpMod({
			// 	user_id: user_id,
			// 	pump_name: req.body.pump_name,
			// });
			const pump = new pumpMod({
				user_id: user_id,
				pump_name: req.body.pump_name,
			});
			console.log(pump, "2222222222222222222222222222222222222");
			let data = await pump.save();
			console.log(data._id, "333333333333333333333333333333333333");
			let updateUser = await userProfileMod.updateOne(
				{ _id: user_id },
				{
					$push: {
						ipumpDetals: data._id,
					},
				},
			);
			console.log(updateUser, "4444444444444444444444444444");
			res.json("pump is created successfully!");
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to get all ico.
	getpump: async (req, res) => {
		try {
			const name = req.params.name;
			//Reading ico.
			const pump_factory = await pumpMod
				.findOne({ pump_name: name })
				.populate({ path: "iusersProfiles" });
			if (!pump_factory) {
				res.json({ message: "invalid pump" });
			}
			res.json({ pumpFactory: pump_factory });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

module.exports = createPumpDetailsFactory;
