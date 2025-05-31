function compress(text) {
  if (text.length <= 160) return text;
  return text.slice(0, 157);
}

module.exports = compress;
