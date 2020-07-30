const mongoose = require('mongoose');
const {Schema} = mongoose;

const metaSchema = new Schema({
    //_id: {type: String, required: false},
    name: String,
    unitsystem: {type: String, required: false},
    calendarDate: {type: String, required: false},
    restingHeartRate: Number,
    weight: {type: Number, required: false}
    


})

const metadata = mongoose.model('metadata', metaSchema,'metadata');

exports.metadata = metadata;
exports.metaSchema = metaSchema;