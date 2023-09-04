const express = require('express');
const app = express();

const cors = require("cors");

app.use(cors())

app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db('hotel_checkins');
    const bookingsCollection = db.collection('bookings');
    const bookingsRouter = createRouter(bookingsCollection);

    app.post('/api/bookings', (req, res) => {
      const newData = req.body;
      if (newData.hasOwnProperty("name") && newData.hasOwnProperty("email")) {
        bookingsCollection
          .insertOne(newData)
          .then((result) => {
            res.json(result.ops[0]);
          })
          .catch((err) => {
            console.error(err);
            res.status(500);
            res.json({ status: 500, error: err });
          });
      } else {
        res.status(400);  
        res.send("please make sure booking has email and name");
      }
    });

    app.use('/api/bookings', bookingsRouter);
  })
  .catch(console.error);

app.listen(9000, function() {
  console.log(`Hotel server running on port ${this.address().port}`);
});