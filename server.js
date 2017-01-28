const express = require('express');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3001;
const PUBLIC_DIR = `${__dirname}/dist`;

// Redirect to non www
app.get('/*', function(req, res, next) {
	if (req.headers.host.match(/^www/) !== null ) {
		res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
	} else {
		next();
	}
});

// Redirect to https
app.get('/*', function(req, res, next) {
	if (req.secure) {
		res.redirect('https://' + req.hostname + req.url);
	} else {
		next();
	}
});

// Redirect all routes without extension to the index.html
app.use(function(req, res, next) {
	if (req.path.indexOf('.') === -1) {
		req.url = '/index.html';
		next();
	}
	else {
		next();
	}
});

// Static files
app.use(express.static(PUBLIC_DIR));

// Redirect all errors to root
app.use(function(req, res) {
	res.redirect('/');
});

// Start the app
app.listen(PORT, function () {
	console.log(`Listening on port ${PORT}!`);
});