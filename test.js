import test from 'ava';
import m from '.';

const invoke = (responseWrapper, body) => {
	const ctx = {body};

	responseWrapper(ctx);

	return ctx.body;
};

test('simple result without properties', t => {
	const body = {foo: 'bar', unicorn: 'rainbow'};

	const result = invoke(m(), body);

	t.truthy(result.date);
	t.deepEqual(result.data, {foo: 'bar', unicorn: 'rainbow'});
});

test('simple result with custom properties (no date)', t => {
	const body = {foo: 'bar', unicorn: 'rainbow'};

	const result = invoke(m({date: false}), body);

	t.falsy(result.date);
	t.deepEqual(result.data, {foo: 'bar', unicorn: 'rainbow'});
});

test('simple result with custom properties (no date, custom key)', t => {
	const body = {foo: 'bar', unicorn: 'rainbow'};

	const result = invoke(m({date: false, key: 'fooresponse'}), body);

	t.falsy(result.date);
	t.deepEqual(result.fooresponse, {foo: 'bar', unicorn: 'rainbow'});
});

test('less simple result without properties', t => {
	const body = {foo: {bar: 'baz', unicorn: 'rainbow'}};

	const result = invoke(m(), body);

	t.truthy(result.date);
	t.deepEqual(result.data, {foo: {bar: 'baz', unicorn: 'rainbow'}});
});

test('less result with custom properties (no date)', t => {
	const body = {foo: {bar: 'baz', unicorn: 'rainbow'}};

	const result = invoke(m({date: false}), body);

	t.falsy(result.date);
	t.deepEqual(result.data, {foo: {bar: 'baz', unicorn: 'rainbow'}});
});

test('less result with custom properties (no date, custom key)', t => {
	const body = {foo: {bar: 'baz', unicorn: 'rainbow'}};

	const result = invoke(m({date: false, key: 'fooresponse'}), body);

	t.falsy(result.date);
	t.deepEqual(result.fooresponse, {foo: {bar: 'baz', unicorn: 'rainbow'}});
});

test('array result without properties', t => {
	const body = [{foo: 'bar', unicorn: 'rainbow'}, {foo: 'baz', hello: 'world'}];

	const result = invoke(m(), body);

	t.truthy(result.date);
	t.deepEqual(result.data, [{foo: 'bar', unicorn: 'rainbow'}, {foo: 'baz', hello: 'world'}]);
});

test('array result with custom properties (no date)', t => {
	const body = [{foo: 'bar', unicorn: 'rainbow'}, {foo: 'baz', hello: 'world'}];

	const result = invoke(m({date: false}), body);

	t.falsy(result.date);
	t.deepEqual(result.data, [{foo: 'bar', unicorn: 'rainbow'}, {foo: 'baz', hello: 'world'}]);
});

test('array result with custom properties (no date, custom key)', t => {
	const body = [{foo: 'bar', unicorn: 'rainbow'}, {foo: 'baz', hello: 'world'}];

	const result = invoke(m({date: false, key: 'fooresponse'}), body);

	t.falsy(result.date);
	t.deepEqual(result.fooresponse, [{foo: 'bar', unicorn: 'rainbow'}, {foo: 'baz', hello: 'world'}]);
});

test('promise result without properties', async t => {
	const body = Promise.resolve({foo: 'bar', unicorn: 'rainbow'});

	const result = await invoke(m(), body);

	t.truthy(result.date);
	t.deepEqual(result.data, {foo: 'bar', unicorn: 'rainbow'});
});

test('promise result with custom properties (no date)', async t => {
	const body = Promise.resolve({foo: 'bar', unicorn: 'rainbow'});

	const result = await invoke(m({date: false}), body);

	t.falsy(result.date);
	t.deepEqual(result.data, {foo: 'bar', unicorn: 'rainbow'});
});

test('promise result with custom properties (no date, custom key)', async t => {
	const body = Promise.resolve({foo: 'bar', unicorn: 'rainbow'});

	const result = await invoke(m({date: false, key: 'fooresponse'}), body);

	t.falsy(result.date);
	t.deepEqual(result.fooresponse, {foo: 'bar', unicorn: 'rainbow'});
});
