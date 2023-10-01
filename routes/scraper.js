const scriptData = require('./scriptData.js');

module.exports.getVersion = function() {
	return new Promise(function (resolve) {
		fetch('https://play.google.com/store/apps/details?id=com.rb.rocketbook&hl=en&gl=us')
			.then(res => res.text())
			.then(scriptData.parse)
			.then(scriptData.extractor({
				version: {
					path: ['ds:5', 1, 2, 140, 0, 0, 0],
					fun: (val) => val || 'VARY'
				}
			}))
			.then(resolve);
	});
};
