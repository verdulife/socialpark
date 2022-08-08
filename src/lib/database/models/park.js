import mongoose from 'mongoose';

const schemma = new mongoose.Schema({
	latitude: {
		type: Number,
		required: true,
		default: 0
	},
	longitude: {
		type: Number,
		required: true,
		default: 0
	},
	street: {
		type: String,
		required: true,
		default: ''
	},
	timestamp: {
		type: Date,
		required: true,
		default: new Date()
	},
	paid: {
		type: Boolean,
		required: true,
		default: false
	},
	car: {
		type: Boolean,
		required: true,
		default: true
	}
});

export default mongoose.model('Park', schemma);
