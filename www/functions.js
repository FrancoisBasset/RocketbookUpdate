function getDeviceMode() {
	return navigator.appVersion.includes('Android') ? 'mobile' : 'web';
}
