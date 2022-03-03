const mongoose = require("mongoose");
const { Schema } = mongoose;
//Model for creating ico.
const pumpSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: "iusersProfiles",
		},
		// vehicle_name: {
		// 	type: String,
		// 	required: true,
		// },
		pump_name: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

//Exporting file and set collection name upPool.
module.exports = mongoose.model("ipumpDetals", pumpSchema);
