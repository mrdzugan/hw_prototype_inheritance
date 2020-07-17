function MyArray() {
	this.length = 0;
}

const MyArrayProto = new MyArray();

MyArray.prototype = MyArrayProto;

MyArrayProto.push = function (...args) {
	for (let i = 0; i < args.length; i++) {
		this[++this.length] = args[i];
	}
	return this.length;
}