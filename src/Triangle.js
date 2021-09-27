const Point = require ('../src/Point.js');
const Shape = require ('../src/Shape.js');

function Triangle (v1, v2, v3) {
    if (!v1 || !v2 || !v3) throw 'Error';
    // if (points.length !== 3) throw 'Error';
    Shape.call(this, [v1, v2, v3]);

    this.toString = function () {
        let stringTriangle = this.points.map(function (item, index) {
            let indexed = index+1;
            return `v${indexed}=(${item.x}, ${item.y})`
        })
        return (`Triangle[${stringTriangle}]`)
    }
    this.getType = function () {
        let firstDistance = +v1.distance(v2).toFixed(2);
        let secondDistance = +v2.distance(v3).toFixed(2);
        let thirdDistance = +v3.distance(v1).toFixed(2);
        if (firstDistance === secondDistance && secondDistance === thirdDistance) {
            return 'equilateral triangle'
        } else if (firstDistance === secondDistance || firstDistance === thirdDistance || secondDistance === thirdDistance) {
            return 'isosceles triangle'
        }
        else return 'scalene triangle'
    }



}
let triange = new Triangle(new Point(1, 2), new Point(2, 3), new Point(2, 3))
module.exports = Triangle;





