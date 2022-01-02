const EventEmitter = require('events');
const myEmitter = new EventEmitter();
const heroes = ['a', 'b', 'c', 'd', 'e', 'f'];

myEmitter.on('heroPicked', (...heroes) => {
	console.log(heroes);
});

myEmitter.emit('heroPicked', ...heroes);
