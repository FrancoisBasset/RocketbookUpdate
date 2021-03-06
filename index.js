const express = require('express');
const app = express();

app.use(express.static('./public'));

app.listen(3000, function() {
	console.log('Start on 3000');
});

app.get('/', function(req, res) {
	res.render('./index.html');
});

app.use('/', require('./routes'));