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

// Append .html to paths with no extension
app.use(function(req, res, next) {
	if (req.path.indexOf('.') === -1) {
		const file = PUBLIC_DIR + req.path + '.html';
		fs.exists(file, function(exists) {
			if (exists)
				req.url += '.html';
				next();
			});
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