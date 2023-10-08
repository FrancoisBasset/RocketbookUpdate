const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.static('./www'));
app.use(cors());

app.listen(3000, function() {
	console.log('Start on 3000');
});

app.get('/', function(req, res) {
	res.render('./index.html');
});

app.use('/', require('./routes'));
