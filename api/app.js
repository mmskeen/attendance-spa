require('dotenv').config();
const path = require('path');
const express = require("express"),
  app = express(),
  port = process.env.PORT || 3001,
  bodyParser = require("body-parser"),
  meetingRoutes = require('./routes/meetings'),
  userRoutes = require('./routes/users');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api/meetings', meetingRoutes);
app.use('/api/users', userRoutes);

app.listen(port, function (err) {
  if (!err) {
    console.log("API server started on port " + port + ".");
  } else {
    console.log(err);
  }
});
