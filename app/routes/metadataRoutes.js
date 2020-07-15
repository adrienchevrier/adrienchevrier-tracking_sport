const mongoose = require('mongoose');
const Garmin = mongoose.model('metadata');

module.exports = (app) => {

  app.get(`/api/metadata`, async (req, res) => {
    let activities = await Garmin.find();
    console.log(activities);
    return res.status(200).send(activities);
  });

  app.post(`/api/metadata`, async (req, res) => {
    // Garmin.find(function(err, activities){
    //   if(err){
    //       res.send(err);
    //   }
    //   res.json(activities);
    let garmin = await Garmin.create(req.body);
    return res.status(201).send({
      error: false,
      garmin
    })
  })

  app.put(`/api/metadata/:id`, async (req, res) => {
    const {id} = req.params;

    let garmin = await Garmin.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      garmin
    })

  });

  app.delete(`/api/metadata/:id`, async (req, res) => {
    const {id} = req.params;

    let garmin = await Garmin.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      garmin
    })

  })

}