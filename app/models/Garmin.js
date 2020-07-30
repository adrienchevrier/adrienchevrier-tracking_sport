const mongoose = require('mongoose');
const {Schema} = mongoose;

const garminSchema = new Schema({
    activityName: String,
    activityType: String,
    distance: Number,
    duration: Number,
    averageHR: Number,
    startTimeLocal: Number,
    duration_min: Number,
    week: String,
    date: String


})

mongoose.model('general_activities', garminSchema);