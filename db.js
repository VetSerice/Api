const mongoose = require('mongoose');


const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to MongoDB yay");
	} catch (err) {
		console.error(err.message);
	}
};

module.exports = connectToMongoDB;