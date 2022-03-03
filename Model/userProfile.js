const mongoose = require("mongoose");
//Model for user details.
const { Schema } = mongoose;
const userProfileSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		// image: {
		// 	type: Object,
		// },
		address: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		ipumpDetals: [
			{
				type: Schema.Types.ObjectId,
				ref: "ipumpDetals",
			},
		],
	},
	{
		timestamps: true,
	},
);
//Exporting file and set collection name user.
module.exports = mongoose.model("iusersProfiles", userProfileSchema);
