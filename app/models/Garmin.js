const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    distance: Number,
    activityName: String,
})

mongoose.model('activities', productSchema);