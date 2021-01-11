const express = require('express');
const router = express.Router();
const jsdom = require('jsdom').JSDOM;

router.get('/rocketbookupdate/lastversion', async function(req, res) {
	const dom = await jsdom.fromURL('https://play.google.com/store/apps/details?id=com.rb.rocketbook&hl=fr');
	
	res.json({
		lastVersion: dom.window.document.getElementsByClassName('IxB2fe')[0].children[3].children[1].textContent
	});
});

module.exports = router;