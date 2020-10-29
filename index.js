const express = require('express');
const app = express();

const jsdom = require('jsdom').JSDOM;

app.use(express.static('./public'));

app.listen(process.env.PORT || 80, function() {
	console.log('Start on 80');
});

app.get('/', function(req, res) {
	res.render('./index.html');
});

app.get('/lastversion', async function(req, res) {
	const dom = await jsdom.fromURL('https://play.google.com/store/apps/details?id=com.rb.rocketbook&hl=fr');
	
	res.json({
		lastVersion: dom.window.document.getElementsByClassName('IxB2fe')[0].children[3].children[1].textContent
	});
});