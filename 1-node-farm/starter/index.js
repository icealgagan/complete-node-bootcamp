const fs = require('fs');
const http = require('http');
const url = require('url');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const replaceTemplate = (temp, product) => {
	let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%FROM%}/g, product.from);
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%QUANTITY%}/g, product.quantity);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);
	output = output.replace(/{%ID%}/g, product.id);

	if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
	return output;
};

//load  products json
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const products = JSON.parse(data);

//SERVER

const server = http.createServer((req, res) => {]
  const pathName = req.url;
  console.log(message)
	const url = new URL(req.url,);
	console.log(typeof url);
	if (pathName === '/' || pathName === '/overview') {
		res.writeHead(200, {
			'Content-Type': 'text/html',
		});
		const cardsHtml = products.map((product) => replaceTemplate(tempCard, product)).join('');

		const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
		res.end(output);
	} else if (pathName === '/product') {
		res.end('This is product');
	} else if (pathName === '/api') {
	} else {
		res.end('Not found');
	}
});

server.listen(8000, '127.0.0.1', () => {
	console.log('listening');
});
