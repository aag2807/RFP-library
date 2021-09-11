const get = (object: any, path: string, defaultValue?: any) => {
	const parts = path.split('.')
	for (let part of parts) {
		if (!object) return defaultValue;
		object = object[part]
	}
	return object ?? defaultValue;
}

const pick = (fn: (arg?) => any) => typeof fn === "string" ? (v) => get(v, fn) : fn

export { get, pick }