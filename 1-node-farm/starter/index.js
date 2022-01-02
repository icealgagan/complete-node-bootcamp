const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const slugify = require('slugify');

//load  products json
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const products = JSON.parse(data);

//SERVER

const server = http.createServer((req, res) => {
	const { query, pathName } = url.parse(req.url, true);
	console.log(pathName);

	if (pathName === '/' || pathName === '/overview') {
		res.writeHead(200, {
			'Content-Type': 'text/html',
		});
		const cardsHtml = products.map((product) => replaceTemplate(tempCard, product)).join('');

		const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
		res.end(output);
	} else if (pathName === '/product') {
		console.log(query);
		res.end('This is product');
	} else if (pathName === '/api') {
	} else {
		res.end('Not found');
	}
});

server.listen(8000, '127.0.0.1', () => {
	console.log('listening');
});
