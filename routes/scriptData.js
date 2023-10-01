const R = require('ramda');

function extractDataWithServiceRequestId(parsedData, spec) {
	const serviceRequestMapping = Object.keys(parsedData.serviceRequestData);
	const filteredDsRootPath = serviceRequestMapping.filter(serviceRequest => {
		const dsValues = parsedData.serviceRequestData[serviceRequest];

		return dsValues.id === spec.useServiceRequestId;
	});

	const formattedPath = (filteredDsRootPath.length)
		? [filteredDsRootPath[0], ...spec.path]
		: spec.path;

	return R.path(formattedPath, parsedData);
}

function extractor(mappings) {
	return function extractFields(parsedData) {
		return R.map((spec) => {
			if (R.is(Array, spec)) {
				return R.path(spec, parsedData);
			}

			const input = (spec.useServiceRequestId)
				? extractDataWithServiceRequestId(parsedData, spec)
				: R.path(spec.path, parsedData);

			return spec.fun(input, parsedData);
		}, mappings);
	};
}

function parse(response) {
	const scriptRegex = />AF_initDataCallback[\s\S]*?<\/script/g;
	const keyRegex = /(ds:.*?)'/;
	const valueRegex = /data:([\s\S]*?), sideChannel: {}}\);<\//;

	const matches = response.match(scriptRegex);

	if (!matches) {
		return {};
	}

	const parsedData = matches.reduce((accum, data) => {
		const keyMatch = data.match(keyRegex);
		const valueMatch = data.match(valueRegex);

		if (keyMatch && valueMatch) {
			const key = keyMatch[1];
			const value = JSON.parse(valueMatch[1]);
			return R.assoc(key, value, accum);
		}
		return accum;
	}, {});

	return Object.assign(
		{},
		parsedData,
		{ serviceRequestData: parseServiceRequests(response) }
	);
}

function parseServiceRequests(response) {
	const scriptRegex = /; var AF_dataServiceRequests[\s\S]*?; var AF_initDataChunkQueue/g;
	const valueRegex = /{'ds:[\s\S]*}}/g;

	const matches = response.match(scriptRegex);

	if (!matches) {
		return {};
	}

	const [data] = matches;
	const valueMatch = data.match(valueRegex);

	if (!valueMatch) {
		return {};
	}

	const value = eval(`(${valueMatch[0]})`);
	return value;
}

module.exports = Object.assign({ parse, parseServiceRequests, extractor, extractDataWithServiceRequestId });
