const express = require('express');
const router = express.Router();
const scraper = require('./scraper');

router.get('/lastversion', async function(req, res) {
	scraper.getVersion({
		appId: 'com.rb.rocketbook'
	}).then(details => {
		res.json({
			lastVersion: details.version
		});
	});
});

module.exports = router;
