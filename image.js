const mongoose = require('mongoose');
const Image = mongoose.model('Image', {
    'indexed_to_algolia': Boolean,
    'details_fetched':   Boolean,
    'sa_id':            String,
    'caption':          String,
    'description':      String,
    'author':           String,
    'place':            String,
    'source':           String,
    'thumbnail_url':    String,
    'image_url':        String,
    'era':              Number,
    'preview_text':     String,
    'era_title':        String,
    'date':             Date,
    'year':             Number,
    'month':            Number,
    'day':              Number,
    's3_thumbnail_url': String,
    's3_large_url':     String
});
module.exports = Image;
