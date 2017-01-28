let reservedHex = {};

// get a random number between 2..254,
// not 0..256 from standard color channel,
// to prevent values near FF and 00 when hexed
function getRandomColor() {
  return Math.max(2, Math.floor(Math.random() * 254));
}

function getRandomRgb() {
  return [0, 0, 0].map(_ => getRandomColor());
}

function rgbToHex(red, green, blue) {
    return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1);
}

function getRandomHex() {
  const hex = rgbToHex(...getRandomRgb());

  if (reservedHex[hex]) {
    return getRandomHex();
  }

  reservedHex[hex] = true;

  return hex;
}


export default function createDebugger(name = 'debug', hex = getRandomHex()) {
  return {
    log(...args) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`%c ${name}`, `color: #${hex}`, ...args);
      }
    },
    warn(...args) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`%c ${name}`, 'color: #D06017', ...args);
      }
    }
  };
};
