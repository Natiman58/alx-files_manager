const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const routes = require('./routes/index');

// to handle url parsing(to extract pwd and email)
// app.use(bodyParser.urlencoded({ extended: true }));---deprecated
// router.use(bodyParser.json());---deprecated
// set the req body size limit to 20mb

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
