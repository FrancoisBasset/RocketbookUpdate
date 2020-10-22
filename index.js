const express = require('express');
const path = require('path');
const app = express();

const jsdom = require('jsdom').JSDOM;

app.listen(process.env.PORT || 80, function() {
	console.log('Start on 80');
});

app.use('/', express.static(path.join(__dirname,"./dist")));
app.get('/version', function(req, res) {
	jsdom.fromURL('https://play.google.com/store/apps/details?id=com.rb.rocketbook&hl=fr').then(dom => {
		const version = dom.window.document.getElementsByClassName('IxB2fe')[0].children[3].children[1].textContent;

		res.json({
			result: version
		});
	});
});