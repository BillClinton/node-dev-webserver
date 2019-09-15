const path = require('path');
const express = require('express');

const app = express();

console.log(path.join(__dirname, '../public'));

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'sunny',
    location: 'Philadelphia'
  });
});

app.listen(3000, () => {
  console.log('Webserver started.');
});
