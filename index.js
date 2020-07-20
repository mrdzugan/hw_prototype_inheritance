'use strict';

function MyArray(...args) {
	if (!new.target) {
		return new MyArray(...args);
	}
	this.length = 0;
	if (args.length) {
		for (const item of args) {
			this[this.length++] = item;
		}
	}
}

const myArrayProto = new MyArray();

MyArray.prototype = myArrayProto;

myArrayProto.push = function (...args) {
	for (let i = 0; i < args.length; i++) {
		this[this.length++] = args[i];
	}
	return this.length;
}

myArrayProto.find = function (callback) {
	for (let i = 0; i < this.length; i++) {
		if (callback(this[i], i, this)) {
			return this[i];
		}
	}
}

myArrayProto.includes = function (searchElement, fromIndex = 0) {
	if (fromIndex >= this.length) {
		return false;
	}
	if (fromIndex < 0) {
		if (fromIndex + this.length < 0) {
			fromIndex = 0;
		} else {
			fromIndex += this.length;
		}
	}
	for (let i = fromIndex; i < this.length; i++) {
		if (this[i] === searchElement) {
			return true;
		}
	}
	return false;
}

myArrayProto.join = function (separator = ',') {
	let str = '';
	for (let i = 0; i < this.length; i++) {
		if (i === this.length - 1) {
			str += this[i];
		} else {
			str += this[i] + separator;
		}
	}
	return str;
}

myArrayProto.filter = function (callback) {
	const arr = new MyArray();
	for (let i = 0; i < this.length; i++) {
		if (callback(this[i], i, this)) {
			arr.push(this[i]);
		}
	}
	return arr;
}

myArrayProto.map = function (callback) {
	const arr = new MyArray();
	for (let i = 0; i < this.length; i++) {
		arr.push(callback(this[i], i, this));
	}
	return arr;
}

myArrayProto.reduce = function (callback, initialValue) {
	if (!this.length && !initialValue) {
		throw new TypeError();
	}
	if (!this.length && initialValue) {
		return initialValue;
	}
	if (this.length === 1 && !initialValue) {
		for (const item of this) {
			if (item) {
				return item;
			}
		}
	}
	let accumulator = initialValue ? initialValue : this[0];
	for (let i = initialValue ? 0 : 1; i < this.length; i++) {
		accumulator = callback(accumulator, this[i], i, this);
	}
	return accumulator;
}