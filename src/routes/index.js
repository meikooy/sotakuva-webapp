if (window && window.innerWidth < 768) {
  module.exports = require('./mobile');
} else {
  module.exports = require('./large');
}
