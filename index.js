const express = require('express');
const bodyParser = require('body-parser');

function echo({body}, res) {
  console.log('Receveived echo request', body)
  res.json(body);
}

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

app.use(express.static('build'));
app.post('/api/fluree.template-react.echo', bodyParser.json(), echo);
app.listen(port, () => console.log('Listening on port', port));
