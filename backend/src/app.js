const express = require('express');
const cors = require('cors');

const packageRoutes = require('./routes/packageRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.send('Test route working');
});

app.use('/api/packages', packageRoutes);

app.listen(5000, () => {
  console.log('Backend running on port 5000');
});
