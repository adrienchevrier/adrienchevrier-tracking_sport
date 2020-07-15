const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    _id: String,
    unitsystem: String,
calendarDate: String,
restingHeartRate: Number,
weight: Number


})

mongoose.model('metadata', productSchema);