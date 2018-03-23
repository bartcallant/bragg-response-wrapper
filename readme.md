# bragg-wrap-response [![Build Status](https://travis-ci.org/bartcallant/bragg-wrap-response.svg?branch=master)](https://travis-ci.org/bartcallant/bragg-wrap-response)

> Wraps any result in the body in an extra object on the [bragg](https://github.com/SamVerschueren/bragg) context

> Adds a date to the body in the response [bragg](https://github.com/SamVerschueren/bragg) context


## Install

```
$ npm install --save bragg-wrap-response
```


## Usage

```js
const bragg = require('bragg');
const wrapResponse = require('bragg-wrap-response');

const app = bragg();

app.use(ctx => {
	ctx.body = {
		foo: 'bar',
		unicorn: 'rainbow',
		user: {
			name: 'Hello',
			password: 'world'
		}
	};
});

app.use(wrapResponse());

app.use(ctx => {
	console.log(ctx.body);
	//=> { date: 2018-03-23T20:50:28.373Z, result: { foo: 'bar', unicorn: 'rainbow', user: { name: 'Hello', password: 'world' } }}
});

exports.handler = app.listen();
```


## API

### wrapResponse({options})

Returns a bragg middleware function.

#### options

Type: `object`<br>
Default: `{date: true', key: 'data'}`


## Related

- [bragg](https://github.com/SamVerschueren/bragg) - AWS λ web framework


## License

MIT © [Bart Callant](https://github.com/bartcallant)
