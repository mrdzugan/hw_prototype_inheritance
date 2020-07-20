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
		this[++this.length] = args[i];
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

