const fs = require('fs');
const jsdom = require('jsdom').JSDOM;
const nodeNotifier = require('node-notifier');

if (!fs.existsSync('./version.txt')) {
	fs.writeFileSync('./version.txt', '0');
}

var currentVersion = fs.readFileSync('./version.txt').toString();

setInterval(function() {
	jsdom.fromURL('https://play.google.com/store/apps/details?id=com.rb.rocketbook&hl=fr').then(dom => {
		const version = dom.window.document.getElementsByClassName('IxB2fe')[0].children[3].children[1].textContent;

		if (version > currentVersion) {
			nodeNotifier.notify({
				title: 'Rocketbook',
				message: `Nouvelle version ${version} !`
			});

			currentVersion = version;
			fs.writeFileSync('./version.txt', version);
		}
	});
}, 2000);