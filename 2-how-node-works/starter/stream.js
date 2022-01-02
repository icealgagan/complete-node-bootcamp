const { checkPrimeSync } = require('crypto');
const fs = require('fs');
const server = require('http').createServer();
const port = 3000;

server.on('request', (req, res) => {
	// fs.readFile('test-file.txt', 'utf8', (err, data) => {
	// 	if (err) console.error(err);
	// 	res.end(data);
	// });

	const readable = fs.createReadStream('test-file.txt');

	readable.on('data', (chunk) => {
		console.log(chunk);
		res.write(chunk);
	});

	readable.on('end', () => {
		console.log('endded');
		res.end();
	});
});

server.listen(port, '127.0.0.1', (err, res) => {
	console.log('server listening on port ' + port);
});
