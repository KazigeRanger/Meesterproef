// Run dit programma door "node .\Testmodellen\cgAndAreaCalc.js" in de terminal uit te voeren.

// Note that all the coordinates and delta's are in mm.
const SD7037_x = [250.0, 249.18, 246.7675, 242.865, 237.6025, 231.125, 223.5625, 215.0375, 205.6525, 195.5025, 184.6625, 173.235, 161.3475, 149.1375, 136.7325, 124.265, 111.8625, 99.655, 87.7525, 76.27, 65.3125, 54.9725, 45.3425, 36.5025, 28.525, 21.465, 15.365, 10.255, 6.155, 3.08, 1.045, 0.0525, 0.3175, 2.015, 5.095, 9.5, 15.185, 22.11, 30.21, 39.4125, 49.625, 60.74, 72.6375, 85.1775, 98.22, 111.6075, 125.185, 138.7975, 152.285, 165.4925, 178.2625, 190.445, 201.88, 212.41, 221.89, 230.1775, 237.1475, 242.6925, 246.725, 249.1775, 250.0];
const SD7037_y = [10.0, 10.105, 10.45, 11.09, 12.0275, 13.2375, 14.6625, 16.225, 17.8525, 19.47, 21.0325, 22.5275, 23.93, 25.2125, 26.345, 27.2925, 28.0275, 28.525, 28.76, 28.72, 28.395, 27.7825, 26.885, 25.715, 24.2875, 22.6225, 20.75, 18.715, 16.58, 14.425, 12.34, 10.4625, 9.0175, 7.9025, 6.9325, 6.1475, 5.5575, 5.165, 4.9575, 4.92, 5.0325, 5.2725, 5.615, 6.035, 6.51, 7.025, 7.56, 8.1, 8.6275, 9.1275, 9.58, 9.965, 10.26, 10.455, 10.55, 10.545, 10.4625, 10.33, 10.1775, 10.0525, 10.0];

const skinThickness = 0.5; // mm

var segmentAreas = [];
var skinPerimeter = [];

function calculateAreas(xValues, yValues, skinThickness) {
    var xDeltas = [];
    var yDeltas = [];

    // Calculate X and Y deltas.
    for (let i = 0; i < xValues.length-1; i++) {
        var deltaX = Math.abs(SD7037_x[i]-SD7037_x[i+1]).toFixed(5);
        xDeltas.push(deltaX);
    }

    for (let i = 0; i < yValues.length-1; i++) {
        var deltaY = Math.abs(SD7037_y[i]-SD7037_y[i+1]).toFixed(5);
        yDeltas.push(deltaY);
    }

    // Calculate general deltas using the Pythagorean theorem.
    for (let i = 0; i < xDeltas.length || i < yDeltas.length; i++) {
        var generalDelta = Math.sqrt(Math.pow(xDeltas[i], 2) + Math.pow(yDeltas[i], 2));
        skinPerimeter.push(generalDelta);
    }

    // Calculate the areas of skin segments.
    for (let i = 0; i < skinPerimeter.length; i++) {
        var segmentArea = skinPerimeter[i] * skinThickness;
        segmentAreas.push(segmentArea);
    }

    // console.log(segmentAreas);
    var summedSkinAreaMillimeter = segmentAreas.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    var summedSkinAreaMeter = summedSkinAreaMillimeter/1000000;
    var summedSkinPerimeterMillimeter = skinPerimeter.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    var summedSkinPerimeterMeter = summedSkinPerimeterMillimeter/1000;
    console.log(`Summed skin area: ${summedSkinAreaMeter}`);
    console.log(`Summed skin perimeter: ${summedSkinPerimeterMeter}`);
    return segmentAreas, skinPerimeter;
}

calculateAreas(SD7037_x, SD7037_y, skinThickness);

function calculateCGCoordinates(xValues, yValues, skinThickness) {
    var numeratorXValues = [];
    var numeratorYValues = [];

    for (let i = 0; i < xValues.length-1 || i < yValues.length-1; i++) {
        // Define rectangle point coordinates.
        var x_A = xValues[i];
        var x_B = xValues[i+1];
        var y_A = yValues[i];
        var y_B = yValues[i+1];

        // Calculate the coordinates of the midpoint of AB.
        var x_M = 0.5*(x_A+x_B);
        var y_M = 0.5*(y_A+y_B);

        // Calculate slopes of the line going through point A and point B and all the lines perpendicular
        // to that line.
        var rc_AB = (y_B-y_A)/(x_B-x_A);

        // Calculate the angle that the line through point A and point B makes with the x-axis.
        var angleAlphaRadians = Math.atan(rc_AB);
        var angleAlphaDegrees = angleAlphaRadians*(180/Math.PI);
        var angleGammaDegrees = 180-90-angleAlphaDegrees;
        var angleGammaRadians = angleGammaDegrees*(Math.PI/180);

        // Calculate the sides of the right triangle that point M makes with the point that the
        // center of gravity lies on.
        var adjacentSide = (skinThickness/2)*Math.cos(angleGammaRadians);
        var oppositeSide = (skinThickness/2)*Math.sin(angleGammaRadians);

        // Calculate the coordinates of the point that the center of gravity lies on.
        if (i <= Math.round(xValues.length/2)-1 || i < Math.round(yValues.length/2)-1) {
            var x_cg = x_M-adjacentSide;
            var y_cg = y_M+oppositeSide;

            var numeratorValueX = x_cg*segmentAreas[i];
            var numeratorValueY = y_cg*segmentAreas[i];
        } else if (i > Math.round(xValues.length/2)-1 || i > Math.round(yValues.length/2)-1) {
            var x_cg = x_M+adjacentSide;
            var y_cg = y_M-oppositeSide;

            var numeratorValueX = x_cg*segmentAreas[i];
            var numeratorValueY = y_cg*segmentAreas[i];
        }

        numeratorXValues.push(numeratorValueX);
        numeratorYValues.push(numeratorValueY);
    }

    // console.log(centerOfGravityXValues);
    // console.log(centerOfGravityYValues);
    var summedSkinNumeratorXValuesMillimeter = numeratorXValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    var summedSkinNumeratorYValuesMillimeter = numeratorYValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    var summedSkinNumeratorXValuesMeter = summedSkinNumeratorXValuesMillimeter/*/1000*/;//HOE CONVERTEREN???
    var summedSkinNumeratorYValuesMeter = summedSkinNumeratorYValuesMillimeter/*/1000*/;//HOE CONVERTEREN???
    console.log(summedSkinNumeratorXValuesMeter);
    console.log(summedSkinNumeratorYValuesMeter);
    return numeratorXValues, numeratorYValues;
}

let upperValues = [];
let lowerValues = [];
for (let i = 0; i < skinPerimeter.length; i++) {
    if (i < 31) {
        upperValues.push(skinPerimeter[i]);
    } else {
        lowerValues.push(skinPerimeter[i]);
    }
}

console.log(`UPPER PERIMETER: ${upperValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}`);
console.log(`LOWER PERIMETER: ${lowerValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}`);