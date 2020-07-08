const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    activityName: String,
    activityType: String,
    distance: Number,
    duration: Number,
    averageHR: Number,
    startTimeLocal: Number,
    duration_min: Number,
    week: String,
    date: Number


})

mongoose.model('general_activities', productSchema);