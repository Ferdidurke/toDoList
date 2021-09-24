function Point (x = 0, y = 0) {
  this.x = x;
  this.y = y;
    this.toString = function () {
      return (`(${this.x}, ${this.y})`)
    }
    this.distance = function (a = 0, b = 0) {
      if (typeof a === "object") {
        n = a.x;
        m = a.y;
        return ( ((this.x - n)**2 + (this.y - m)**2)**0.5 )
        } else {
        return ( ((this.x - a)**2 + (this.y - b)**2)**0.5 )
      }
    }
}

module.exports = Point;

