require('dotenv').load();

const Image = require('./image.js');
const mongoose = require('mongoose');
const sm = require('sitemap');
const fs = require('fs');

const SRC_DIR = `${__dirname}/src`;

// Connect mongoose
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;



// Load all images and build sitemap.xml
const urls = [];


Image.where().select(['_id', 'caption']).limit(200000).then(images => {
	images.forEach(image => {
		urls.push({
			url: `/kuvat/${image._id}`,
			img: [
				{
					url: `https://api.rintamalla.fi/images/${image._id}/file?size=large`,
					caption: image.caption
				}
			]
		});
	});

	sitemap = sm.createSitemap ({
		hostname: 'https://rintamalla.fi',
		urls: urls
	});

	fs.writeFileSync(SRC_DIR + '/assets/sitemap.xml', sitemap.toString());
	console.log('DONE!');

}, console.log);