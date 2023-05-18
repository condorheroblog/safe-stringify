function safeStringifyReplacer(seen, trace) {
	return function (key, value) {
		if (value !== null && typeof value === 'object') {
			if (seen.has(value)) {
				return trace ? `[Circular *${seen.get(value)}]` : '[Circular]';
			}

			seen.set(value, key);

			const newValue = Array.isArray(value) ? [] : {};

			for (const [key2, value2] of Object.entries(value)) {
				newValue[key2] = safeStringifyReplacer(seen, trace)(key2, value2);
			}

			seen.delete(value);

			return newValue;
		}

		return value;
	};
}

export default function safeStringify(object, {indentation, trace} = {}) {
	const seen = new WeakMap();
	return JSON.stringify(object, safeStringifyReplacer(seen, trace), indentation);
}
