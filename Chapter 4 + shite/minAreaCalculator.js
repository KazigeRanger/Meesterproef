/*
This model outputs two arrays: an array with the x-coordinates of the points that describe the 
minimum area enclosed by the front and the rear spar and an array with the according y-coordinates.
To get the area described by these points, input the two arrays into the ShoelaceFormula.js file.
*/

const SD7037_x_mm = [250.0, 249.18, 246.7675, 242.865, 237.6025, 231.125, 223.5625, 215.0375, 205.6525, 195.5025, 184.6625, 173.235, 161.3475, 149.1375, 136.7325, 124.265, 111.8625, 99.655, 87.7525, 76.27, 65.3125, 54.9725, 45.3425, 36.5025, 28.525, 21.465, 15.365, 10.255, 6.155, 3.08, 1.045, 0.0525, 0.3175, 2.015, 5.095, 9.5, 15.185, 22.11, 30.21, 39.4125, 49.625, 60.74, 72.6375, 85.1775, 98.22, 111.6075, 125.185, 138.7975, 152.285, 165.4925, 178.2625, 190.445, 201.88, 212.41, 221.89, 230.1775, 237.1475, 242.6925, 246.725, 249.1775, 250.0];
const SD7037_y_mm = [10.0, 10.105, 10.45, 11.09, 12.0275, 13.2375, 14.6625, 16.225, 17.8525, 19.47, 21.0325, 22.5275, 23.93, 25.2125, 26.345, 27.2925, 28.0275, 28.525, 28.76, 28.72, 28.395, 27.7825, 26.885, 25.715, 24.2875, 22.6225, 20.75, 18.715, 16.58, 14.425, 12.34, 10.4625, 9.0175, 7.9025, 6.9325, 6.1475, 5.5575, 5.165, 4.9575, 4.92, 5.0325, 5.2725, 5.615, 6.035, 6.51, 7.025, 7.56, 8.1, 8.6275, 9.1275, 9.58, 9.965, 10.26, 10.455, 10.55, 10.545, 10.4625, 10.33, 10.1775, 10.0525, 10.0];

const SD7037_x_m = [];
const SD7037_y_m = [];

for (let i = 0; i < SD7037_x_mm.length; i++) {
    SD7037_x_m.push(parseFloat((SD7037_x_mm[i]/1000).toFixed(7)));
    SD7037_y_m.push(parseFloat((SD7037_y_mm[i]/1000).toFixed(7)));
}

// Define the location of the front and the rear spar
const chordLength = 0.25; // m 
const xFrontSpar = 0.304*chordLength; // m
const xRearSpar = 0.55*chordLength; // m

console.log(`The position of the front spar is at x = ${xFrontSpar}m`);
console.log(`The position of the rear spar is at x = ${xRearSpar}m`);

function calculateMinimumEnclosedArea(xVertices, yVertices, xFrontSpar, xRearSpar) {
    let splicedXVertices = [];
    let splicedYVertices = [];

    /* 
    Splice the xVertices array so that it only includes the vertices that lie 
    beyond a specified vertical line. In this case that specified vertical line is
    the front spar. We also splice the yVertices array in the same way to get the
    y-values of the points of which we already spliced the x-values.
    */
    for (let i = 0; i < xVertices.length; i++) {
        if (xFrontSpar <= xVertices[i] && xVertices[i-1] > xFrontSpar && xVertices[i] <= xRearSpar && xVertices[i-1] < xRearSpar) {
            splicedXVertices.push(xVertices[i]);
            splicedYVertices.push(yVertices[i]);
        } else if (xVertices[i] < xRearSpar && xVertices[i-1] >= xRearSpar) {
            let intersectLineSlope = -(Math.max(yVertices[i], yVertices[i-1])-Math.min(yVertices[i], yVertices[i-1]))/(Math.max(xVertices[i], xVertices[i-1])-Math.min(xVertices[i], xVertices[i-1]));
            let intersectLineDisplacement = yVertices[i]-intersectLineSlope*xVertices[i];

            let yRearSpar = intersectLineSlope*xRearSpar+intersectLineDisplacement;
            splicedYVertices.push(yRearSpar);

            splicedXVertices.push(xVertices[i]);
            splicedYVertices.push(yVertices[i]);
        } else if (xVertices[i] < xFrontSpar && xVertices[i-1] >= xFrontSpar) {
            let intersectLineSlope = (Math.max(yVertices[i], yVertices[i-1])-Math.min(yVertices[i], yVertices[i-1]))/(Math.max(xVertices[i], xVertices[i-1])-Math.min(xVertices[i], xVertices[i-1]));
            let intersectLineDisplacement = yVertices[i]-intersectLineSlope*xVertices[i];

            let yFrontSpar = intersectLineSlope*xFrontSpar+intersectLineDisplacement;
            splicedYVertices.push(yFrontSpar);
        } else if (xVertices[i] > xFrontSpar && xVertices[i-1] <= xFrontSpar) {
            splicedXVertices.push(xVertices[i]);
            splicedYVertices.push(yVertices[i]);

            let intersectLineSlope = (Math.max(yVertices[i], yVertices[i-1])-Math.min(yVertices[i], yVertices[i-1]))/(Math.max(xVertices[i], xVertices[i-1])-Math.min(xVertices[i], xVertices[i-1]));
            let intersectLineDisplacement = yVertices[i]-intersectLineSlope*xVertices[i];

            let yFrontSpar = intersectLineSlope*xFrontSpar+intersectLineDisplacement;
            splicedYVertices.splice(splicedYVertices.indexOf(Math.min(...splicedYVertices)), 0, yFrontSpar);
        } else if (xVertices[i] > xRearSpar && xVertices[i-1] <= xRearSpar) {
            let intersectLineSlope = (Math.max(yVertices[i], yVertices[i-1])-Math.min(yVertices[i], yVertices[i-1]))/(Math.max(xVertices[i], xVertices[i-1])-Math.min(xVertices[i], xVertices[i-1]));
            let intersectLineDisplacement = yVertices[i]-intersectLineSlope*xVertices[i];

            let yRearSpar = intersectLineSlope*xRearSpar+intersectLineDisplacement;
            splicedYVertices.push(yRearSpar);
        }
    }

    /* 
    Insert the x-location of the front spar into the array twice, because the x-location
    of the front spar has two according y-coordinates, so there must also be two
    x-coordinates to match with the two y-coordinates.
    */
    splicedXVertices.splice(splicedXVertices.indexOf(Math.min(...splicedXVertices))+1, 0, xFrontSpar, xFrontSpar);
    splicedXVertices.splice(0, 0, xRearSpar);
    splicedXVertices.splice(splicedXVertices.length, 0, xRearSpar);

    console.log(splicedXVertices);
    console.log(splicedYVertices);
}

calculateMinimumEnclosedArea(SD7037_x_m, SD7037_y_m, xFrontSpar, xRearSpar);