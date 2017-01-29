const express = require('express');
const fs = require('fs');
const Image = require('./image.js');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const PUBLIC_DIR = `${__dirname}/dist`;

if (!String.prototype.splice) {
  String.prototype.splice = function(start, delCount, newSubStr) {
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
  };
}

// Connect mongoose
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

// Redirect to non www
app.get('/*', function(req, res, next) {
	if (req.headers.host.match(/^www/) !== null ) {
		res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
	}
	else {
		next();
	}
});

// Set meta tags for images
app.get('/kuvat/:id', function(req, res) {
  const {id} = req.params;
  var html = fs.readFileSync(PUBLIC_DIR + '/index.html').toString();

  // Fetch image data
  Image.findById(id, (error, image) => {
  	console.log(image);
  	const ogImage = `<meta name="og:image" content="https://api.rintamalla.fi/images/${id}/file?size=large" />`;
  	var ogDescription = '';
  	if (!error) {
		ogDescription = `<meta name="og:description" content="${image.caption}" />`;
  	}

  	html = html.splice(html.indexOf('</title>') + 8, 0, ogImage + ogDescription);
	res.set('Content-Type', 'text/html').send(html);
  });
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
