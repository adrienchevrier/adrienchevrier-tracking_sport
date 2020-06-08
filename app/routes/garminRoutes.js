const mongoose = require('mongoose');
const Garmin = mongoose.model('activities');

module.exports = (app) => {

  app.get(`/api/garmin`, async (req, res) => {
    let activities = await Garmin.find();
    return res.status(200).send(activities);
  });

  app.post(`/api/garmin`, async (req, res) => {
    let garmin = await Garmin.create(req.body);
    return res.status(201).send({
      error: false,
      garmin
    })
  })

  app.put(`/api/garmin/:id`, async (req, res) => {
    const {id} = req.params;

    let garmin = await Garmin.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      garmin
    })

  });

  app.delete(`/api/garmin/:id`, async (req, res) => {
    const {id} = req.params;

    let garmin = await Garmin.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      garmin
    })

  })

}