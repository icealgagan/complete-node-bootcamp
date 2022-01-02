const fs = require('fs');

setTimeout(() => {
	console.log('Timer 1 finished');
}, 0);

setImmediate(() => {
	console.log('immediate 1 finished');
});

fs.readFile('test-file.txt', 'utf8', () => {
	console.log('io finished');
});


console.log('hello from top level code')