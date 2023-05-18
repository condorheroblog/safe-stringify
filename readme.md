# safe-stringify

> Serialize objects to JSON with handling for circular references

`JSON.stringify()` throws an error if the object contains circular references. This package replaces circular references with `"[Circular]"`.

## Install

```sh
npm install @sindresorhus/safe-stringify
```

## Usage

```js
import safeStringify from '@sindresorhus/safe-stringify';

const foo = {a: true};
foo.b = foo;

console.log(safeStringify(foo));
//=> '{"a":true,"b":"[Circular]"}'

console.log(JSON.stringify(foo));
//=> TypeError: Converting circular structure to JSON
```

## API

### safeStringify(value, options?)

Returns a string.

*Note: There is no `replacer` option as I didn't need that, but “pull request welcome” if you need it.*

#### value

Type: `unknown`

The value to convert to a JSON string.

#### options

Type: `object`

##### indentation

Type: `'string' | 'number'`

The indentation of the JSON.

By default, the JSON is not indented. Set it to `'\t'` for tab indentation or the number of spaces you want.

##### trace

Type: `'boolean'`\
Default: `false`

Control whether to display key names for circular references.

By default, this option is set to false.

Example of using the trace option:

```js
const foo = {a: true};
foo.b = foo;

console.log(safeStringify(foo, {trace: true}));
//=> '{"a":true,"b":"[Circular *]"}'

const goo = {a: true, b: {}};
goo.b.c = goo.b;

console.log(safeStringify(goo, {trace: true}));
//=> '{"a":true,"b":{"c":"[Circular *b]"}}'
```

## FAQ

### Why another safe stringify package?

The existing ones either did too much, did it incorrectly, or used inefficient code (not using `WeakSet`). For example, many packages incorrectly replaced all duplicate objects, not just circular references, and did not handle circular arrays.
