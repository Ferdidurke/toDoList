const Point = require ('../src/Point.js');

function Shape (points, color = 'green', filled = true) {

    this.color = color;
    this.filled = filled;
    this.points = [];
    points.forEach(point => this.points.push({x: point.x, y: point.y}));
    if (points.length < 3) {
        throw 'Error! Need to 3 points min'
    }
    this.toString = function () {
        let c = this.points.map(function (item) {
            return ` (${item.x}, ${item.y})`
        })
        return (`A Shape with color of ${this.color} and ${(this.filled) ? `filled` : `not filled`}. Points:${c}.`)
    }
    this.getPerimeter = function () {
        const length = this.points.length;
        let currentPoint = this.points[length - 1];
        let arr = [];
        for (let i = 0; i < length; i++) {
            const nextPoint = this.points[i];
            arr.push(new Point(currentPoint.x, currentPoint.y).distance(nextPoint.x, nextPoint.y));
            currentPoint = nextPoint;
        }
        return arr.reduce(function (prev, next) {
            return prev+next;
        });
    }

        }

module.exports = Shape;
let shape = new Shape([new Point(1,3), new Point(2, 4), new Point (4,5)],'red', false)

