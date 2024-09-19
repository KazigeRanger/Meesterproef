const SD7037_x = [0.25, 0.24918, 0.2467675, 0.242865, 0.2376025, 0.231125, 0.2235625, 0.2150375, 0.2056525, 0.1955025, 0.1846625, 0.173235, 0.1613475, 0.1491375, 0.1367325, 0.124265, 0.1118625, 0.099655, 0.0877525, 0.07627, 0.0653125, 0.0549725, 0.0453425, 0.0365025, 0.028525, 0.021465, 0.015365, 0.010255, 0.006155, 0.00308, 0.001045, 0.0000525, 0.0003175, 0.002015, 0.005095, 0.0095, 0.015185, 0.02211, 0.03021, 0.0394125, 0.049625, 0.06074, 0.0726375, 0.0851775, 0.09822, 0.1116075, 0.125185, 0.1387975, 0.152285, 0.1654925, 0.1782625, 0.190445, 0.20188, 0.21241, 0.22189, 0.2301775, 0.2371475, 0.2426925, 0.246725, 0.2491775, 0.25];
const SD7037_y = [0.01, 0.010105, 0.01045, 0.01109, 0.0120275, 0.0132375, 0.0146625, 0.016225, 0.0178525, 0.01947, 0.0210325, 0.0225275, 0.02393, 0.0252125, 0.026345, 0.0272925, 0.0280275, 0.028525, 0.02876, 0.02872, 0.028395, 0.0277825, 0.026885, 0.025715, 0.0242875, 0.0226225, 0.02075, 0.018715, 0.01658, 0.014425, 0.01234, 0.0104625, 0.0090175, 0.0079025, 0.0069325, 0.0061475, 0.0055575, 0.005165, 0.0049575, 0.00492, 0.0050325, 0.0052725, 0.005615, 0.006035, 0.00651, 0.007025, 0.00756, 0.0081, 0.0086275, 0.0091275, 0.00958, 0.009965, 0.01026, 0.010455, 0.01055, 0.010545, 0.0104625, 0.01033, 0.0101775, 0.0100525, 0.01];

// Define spar locations
const chordLength = 0.25; // m

const frontSparX = 0.304*chordLength; // m
const rearSparX = 0.6*chordLength; // m

function divideAreas(xCoords, yCoords, frontSparX, rearSparX) {
    // Define arrays to save the coordinates that describe the areas
    let frontAreaXCoords = [];
    let frontAreaYCoords = [];
    let enclosedAreaXCoords = [];
    let enclosedAreaYCoords = [];
    let rearAreaXCoords = [];
    let rearAreaYCoords = [];

    // Loop over all the airfoil coordinates and check which area they describe
    for (let i = 0; i < xCoords.length; i++) {
        if (xCoords[i] >= rearSparX) {
            rearAreaXCoords.push(xCoords[i]);
            rearAreaYCoords.push(yCoords[i]);
        } else if (xCoords[i] <= rearSparX && xCoords[i] >= frontSparX) {
            enclosedAreaXCoords.push(xCoords[i]);
            enclosedAreaYCoords.push(yCoords[i]);
        } else if (xCoords[i] <= frontSparX) {
            frontAreaXCoords.push(xCoords[i]);
            frontAreaYCoords.push(yCoords[i]);
        }
    }

    // Append the spar coordinates to the arrays so that the entire area up until the spar(s) is described
    let minRearXValueIndex = rearAreaXCoords.indexOf(Math.min(...rearAreaXCoords));
    if (yCoords.indexOf(rearAreaYCoords[minRearXValueIndex]) === yCoords.indexOf(rearAreaYCoords[minRearXValueIndex-1])+1) {
        // This code will run if the minimum x value is at the top of the airfoil
        rearAreaXCoords.splice(minRearXValueIndex+1, 0, rearSparX, rearSparX);

        // Calculate the slope and displacement of the line that intersects with the points that lie
        // on either side of the top of the rear spar
        let intersectSlopeTop = (yCoords[minRearXValueIndex+1]-yCoords[minRearXValueIndex])/(xCoords[minRearXValueIndex+1]-xCoords[minRearXValueIndex]);
        let intersectDisplacementTop = yCoords[minRearXValueIndex]-intersectSlopeTop*xCoords[minRearXValueIndex];

        // Calculate the y value of the rear spar at the top of the airfoil
        let rearSparYTop = intersectSlopeTop*rearSparX+intersectDisplacementTop;

        // Calculate the slope and displacement of the line that intersects with the points that lie
        // on either side of the bottom of the rear spar
        let intersectSlopeBottom = (yCoords[yCoords.indexOf(rearAreaYCoords[minRearXValueIndex+1])]-yCoords[yCoords.indexOf(rearAreaYCoords[minRearXValueIndex+1])-1])/(xCoords[xCoords.indexOf(rearAreaXCoords[minRearXValueIndex+3])]-xCoords[xCoords.indexOf(rearAreaXCoords[minRearXValueIndex+3])-1]);
        let intersectDisplacementBottom = yCoords[yCoords.indexOf(rearAreaYCoords[minRearXValueIndex+1])]-intersectSlopeBottom*xCoords[xCoords.indexOf(rearAreaXCoords[minRearXValueIndex+3])];

        let rearSparYBottom = intersectSlopeBottom*rearSparX+intersectDisplacementBottom;

        rearAreaYCoords.splice(minRearXValueIndex+1, 0, rearSparYTop, rearSparYBottom);

        enclosedAreaYCoords.splice(0, 0, rearSparYTop);
        enclosedAreaYCoords.push(rearSparYBottom);
    } else {
        // This code will run if the minimum x value is at the bottom of the airfoil
        rearAreaXCoords.splice(minRearXValueIndex, 0, rearSparX, rearSparX);

        // Calculate the slope and displacement of the line that intersects with the points that lie
        // on either side of the top of the rear spar
        let intersectSlopeTop = (rearAreaYCoords[minRearXValueIndex-1]-yCoords[yCoords.indexOf(rearAreaYCoords[minRearXValueIndex-1])+1])/(rearAreaXCoords[minRearXValueIndex-1]-xCoords[xCoords.indexOf(rearAreaXCoords[minRearXValueIndex-1])+1])
        let intersectDisplacementTop = rearAreaYCoords[minRearXValueIndex-1]-intersectSlopeTop*rearAreaXCoords[minRearXValueIndex-1];

        let rearSparYTop = intersectSlopeTop*rearSparX+intersectDisplacementTop;

        // Calculate the slope and displacement of the line that intersects with the points that lie
        // on either side of the bottom of the rear spar
        let intersectSlopeBottom = (rearAreaYCoords[minRearXValueIndex]-yCoords[yCoords.indexOf(rearAreaYCoords[minRearXValueIndex])-1])/(rearAreaXCoords[minRearXValueIndex+2]-xCoords[xCoords.indexOf(rearAreaXCoords[minRearXValueIndex+2])-1]);
        let intersectDisplacementBottom = rearAreaYCoords[minRearXValueIndex]-intersectSlopeBottom*rearAreaXCoords[minRearXValueIndex+2];

        let rearSparYBottom = intersectSlopeBottom*rearSparX+intersectDisplacementBottom;

        rearAreaYCoords.splice(minRearXValueIndex, 0, rearSparYTop, rearSparYBottom);

        enclosedAreaYCoords.splice(0, 0, rearSparYTop);
        enclosedAreaYCoords.push(rearSparYBottom);
    }

    // Calculate the slope and displacement of the line that intersects with the points that lie
    // on either side of the top of the front spar
    let frontIntersectSlopeTop = (yCoords[yCoords.indexOf(frontAreaYCoords[0])-1]-frontAreaYCoords[0])/(xCoords[xCoords.indexOf(frontAreaXCoords[0])-1]-frontAreaXCoords[0]);
    let frontIntersectDisplacementTop = frontAreaYCoords[0]-frontIntersectSlopeTop*frontAreaXCoords[0];

    let frontSparYTop = frontIntersectSlopeTop*frontSparX+frontIntersectDisplacementTop;

    frontAreaXCoords.splice(0, 0, frontSparX);
    frontAreaYCoords.splice(0, 0, frontSparYTop);

    // Calculate the slope and displacement of the line that intersects with the points that lie
    // on either side of the bottom of the front spar
    let frontIntersectSlopeBottom = (yCoords[yCoords.indexOf(frontAreaYCoords[frontAreaYCoords.length-1])+1]-frontAreaYCoords[frontAreaXCoords.length-1])/(xCoords[xCoords.indexOf(frontAreaXCoords[frontAreaXCoords.length-1])+1]-frontAreaXCoords[frontAreaXCoords.length-1]);
    let frontIntersectDisplacementBottom = frontAreaYCoords[frontAreaYCoords.length-1]-frontIntersectSlopeBottom*frontAreaXCoords[frontAreaXCoords.length-1];

    let frontSparYBottom = frontIntersectSlopeBottom*frontSparX+frontIntersectDisplacementBottom;

    frontAreaXCoords.push(frontSparX);
    frontAreaYCoords.push(frontSparYBottom);

    // Splice enclosed area spar coordinates
    enclosedAreaXCoords.splice(0, 0, rearSparX);
    enclosedAreaXCoords.push(rearSparX);

    if (xCoords.indexOf(Math.min(...enclosedAreaXCoords)) === xCoords.indexOf(enclosedAreaXCoords[enclosedAreaXCoords.indexOf(Math.min(...enclosedAreaXCoords))-1])+1) {
        // This code will run if the minimum x value is at the top of the airfoil
        enclosedAreaXCoords.splice(enclosedAreaXCoords.indexOf(Math.min(...enclosedAreaXCoords))+1, 0, frontSparX, frontSparX);
        enclosedAreaYCoords.splice(enclosedAreaXCoords.indexOf(Math.min(...enclosedAreaXCoords)), 0, frontSparYTop, frontSparYBottom);
    } else {
        enclosedAreaXCoords.splice(enclosedAreaXCoords.indexOf(Math.min(...enclosedAreaXCoords)), 0, frontSparX, frontSparX);
        enclosedAreaYCoords.splice(enclosedAreaXCoords.indexOf(Math.min(...enclosedAreaXCoords)), 0, frontSparYTop, frontSparYBottom);
    }

    // console.log(frontAreaXCoords.length + " " + frontAreaYCoords.length);
    // console.log(enclosedAreaXCoords.length + " " + enclosedAreaYCoords.length);
    // console.log(rearAreaXCoords.length + " " + rearAreaYCoords.length);

    // console.log(frontAreaXCoords);
    // console.log(frontAreaYCoords);

    // console.log(enclosedAreaXCoords);
    // console.log(enclosedAreaYCoords);

    // console.log(rearAreaYCoords);
    // console.log(rearAreaXCoords);

    return [frontAreaXCoords, frontAreaYCoords, enclosedAreaXCoords, enclosedAreaYCoords, rearAreaXCoords, rearAreaYCoords];
}

// divideAreas(SD7037_x, SD7037_y, frontSparX, rearSparX);

module.exports = {divideAreas};