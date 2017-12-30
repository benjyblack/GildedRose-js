class MathExtensions {
  static clamp(min, max, val) {
    return Math.max(min, Math.min(val, max));
  }
}

module.exports = MathExtensions;