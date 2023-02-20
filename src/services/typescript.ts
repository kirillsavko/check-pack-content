/**
 * Returns explicit types of keys' of an object.
 * By default, the `Object.keys` method returns an array of strings even
 * if the keys of the object are declared explicitly.
 */
export const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>
