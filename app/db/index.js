
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://mongo-app:27017/activities`)
        .catch(e => {
            console.error('Connection error', e.message)
        });




const db = mongoose.connection

module.exports = db