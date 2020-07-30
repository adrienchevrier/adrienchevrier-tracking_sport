const mongoose = require('mongoose');
const meta = mongoose.model('metadata');

module.exports = (app) => {

  app.get(`/api/metadata`, async (req, res) => {
    let activities = await meta.find();
    console.log(activities);
    return res.status(200).send(activities);
  });

  app.get(`/api/getmetadata`, async (req, res) => {
    await meta.find({}, (err, data) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!data.length) {
          return res
              .status(404)
              .json({ success: false, error: `data not found` })
      }
      return res.status(200).json({ success: true, data: data })
  }).catch(err => console.log(err))
  });


  app.post(`/api/metadata`, async (req, res) => {
    // meta.find(function(err, activities){
    //   if(err){
    //       res.send(err);
    //   }
    //   res.json(activities);
    let garmin = await meta.create(req.body);
    return res.status(201).send({
      error: false,
      garmin
    })
  })

  app.put(`/api/metadata/:id`, async (req, res) => {
    const {id} = req.params;

    let garmin = await meta.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      garmin
    })

  });

  app.delete(`/api/metadata/:id`, async (req, res) => {
    const {id} = req.params;

    let garmin = await meta.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      garmin
    })

  })

}