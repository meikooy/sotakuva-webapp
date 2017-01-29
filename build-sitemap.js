require('dotenv').load();

const Image = require('./image.js');
const mongoose = require('mongoose');
const sm = require('sitemap');
const fs = require('fs');
const _ = require('lodash');

const SRC_DIR = `${__dirname}/src`;

// Connect mongoose
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;



// Load all images and build sitemap.xml
Image.count().then(c => {
	console.log('Found ' + c + ' images');
	const perPage = 50000;
	const pages = Math.ceil(c / perPage);

	console.log('Found ' + pages + ' pages');

	_.times(pages, function(i) {
		Image.where().select(['_id', 'caption']).skip(i * perPage).limit(perPage).then(images => {
			const urls = [];
			
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

			
			const sitemap = sm.createSitemap ({
				hostname: 'https://rintamalla.fi',
				urls: urls
			});

			fs.writeFileSync(SRC_DIR + '/assets/sitemap-'+i+'.xml', sitemap.toString());
			console.log('DONE! ' + i);

		}, console.log);
	});

}, console.log);