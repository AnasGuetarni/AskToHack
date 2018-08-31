const mongoose = require('mongoose');

var url = "mongodb://localhost:27017/asktohack";

mongoose.connect(url, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
   console.log(`-> ${url} connected`.yellow);
});

mongoose.connection.on('error', (err) => {
  console.log(`mongoose connection err: `, err);
});
