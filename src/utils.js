function isInMobile() {
	return navigator.appVersion.includes('Android');
}

export {
	isInMobile
};