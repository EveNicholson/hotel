use hotel_checkins;
db.dropDatabase();

db.bookings.insertMany([
  {
    "name": "Ewelina",
    "email": "e.guzikk@gmail.com",
    "checked_in": true
  },
  {
    "name": "Philip",
    "email": "philip@gmail.com",
    "checked_in": true
  },
  
]);
