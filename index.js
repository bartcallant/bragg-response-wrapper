'use strict';
const isPromise = require('is-promise');

const wrap = (body, params) => {
	if (params) {
		if (params.date && typeof params.date !== 'boolean') {
			throw new TypeError(`Expected \`date\` to be of type \`boolean\`, got \`${typeof params.date}\``);
		}
		if (params.key && typeof params.key !== 'string') {
			throw new TypeError(`Expected \`key\` to be of type \`string\`, got \`${typeof params.key}\``);
		}
	}

	const defaultParams = Object.assign({
		date: true,
		key: 'data'
	}, params);

	let result = {
		[defaultParams.key]: body
	};

	if (defaultParams.date) {
		result = Object.assign(result, {date: new Date()});
	}

	return result;
};

module.exports = function (params) {
	return ctx => {
		if (isPromise(ctx.body)) {
			ctx.body = ctx.body.then(x => wrap(x, params));
		} else {
			ctx.body = wrap(ctx.body, params);
		}
	};
};
