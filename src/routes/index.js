const mobileRoutesEnabled = false;
if (window && window.innerWidth < 768 && mobileRoutesEnabled) {
  module.exports = require('./mobile');
} else {
  module.exports = require('./large');
}
