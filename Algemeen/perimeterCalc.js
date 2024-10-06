const { calculateSparYCoordinates } = require("./sparsCalc.js");

const SD7037_x = [0.25, 0.24918, 0.2467675, 0.242865, 0.2376025, 0.231125, 0.2235625, 0.2150375, 0.2056525, 0.1955025, 0.1846625, 0.173235, 0.1613475, 0.1491375, 0.1367325, 0.124265, 0.1118625, 0.099655, 0.0877525, 0.07627, 0.0653125, 0.0549725, 0.0453425, 0.0365025, 0.028525, 0.021465, 0.015365, 0.010255, 0.006155, 0.00308, 0.001045, 0.0000525, 0.0003175, 0.002015, 0.005095, 0.0095, 0.015185, 0.02211, 0.03021, 0.0394125, 0.049625, 0.06074, 0.0726375, 0.0851775, 0.09822, 0.1116075, 0.125185, 0.1387975, 0.152285, 0.1654925, 0.1782625, 0.190445, 0.20188, 0.21241, 0.22189, 0.2301775, 0.2371475, 0.2426925, 0.246725, 0.2491775, 0.25];
const SD7037_y = [0.01, 0.010105, 0.01045, 0.01109, 0.0120275, 0.0132375, 0.0146625, 0.016225, 0.0178525, 0.01947, 0.0210325, 0.0225275, 0.02393, 0.0252125, 0.026345, 0.0272925, 0.0280275, 0.028525, 0.02876, 0.02872, 0.028395, 0.0277825, 0.026885, 0.025715, 0.0242875, 0.0226225, 0.02075, 0.018715, 0.01658, 0.014425, 0.01234, 0.0104625, 0.0090175, 0.0079025, 0.0069325, 0.0061475, 0.0055575, 0.005165, 0.0049575, 0.00492, 0.0050325, 0.0052725, 0.005615, 0.006035, 0.00651, 0.007025, 0.00756, 0.0081, 0.0086275, 0.0091275, 0.00958, 0.009965, 0.01026, 0.010455, 0.01055, 0.010545, 0.0104625, 0.01033, 0.0101775, 0.0100525, 0.01];

function calculateAirfoilPerimeter(frontSparX, rearSparX) {
    // Define the coordinates of the spars
    const sparYCoordinates = calculateSparYCoordinates(frontSparX, rearSparX);

    const frontTopY = sparYCoordinates[1];
    const frontBottomY = sparYCoordinates[2];
    const rearTopY = sparYCoordinates[4];
    const rearBottomY = sparYCoordinates[5];

    let totalPerimeter = 0;

    let rearTopPerimeter = 0;
    let enclosedTopPerimeter = 0;
    let frontTopPerimeter = 0;
    let frontBottomPerimeter = 0;
    let enclosedBottomPerimeter = 0;
    let rearBottomPerimeter = 0;

    let upperSkin;
    let lowerSkin;

    // Calculate the distances between each airfoil point
    for (let i = 0; i < SD7037_x.length; i++) {
        if (i < 31) {
            upperSkin = true;
            lowerSkin = false;
        } else if (i > 31) {
            upperSkin = false;
            lowerSkin = true;
        } else if (i === 31 || i === 0) {
            upperSkin = true;
            lowerSkin = true;
        }

        if (i+1 !== SD7037_x.length) {
            let deltaX = SD7037_x[i]-SD7037_x[i+1];
            let deltaY = SD7037_y[i]-SD7037_y[i+1];

            let distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

            totalPerimeter += distance;

            // Rear top perimeter conditional
            if (SD7037_x[i] > rearSparX && SD7037_x[i+1] > rearSparX && upperSkin === true) {
                rearTopPerimeter += distance;
                // Rear top perimeter edge case conditional
            } else if (SD7037_x[i] > rearSparX && SD7037_x[i+1] < rearSparX && upperSkin === true) {
                deltaX = SD7037_x[i]-rearSparX;
                deltaY = SD7037_y[i]-rearTopY;

                distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                rearTopPerimeter += distance;
                // Enclosed top perimeter conditional
            } else if (SD7037_x[i] < rearSparX && SD7037_x[i+1] < rearSparX && SD7037_x[i] > frontSparX && SD7037_x[i+1] > frontSparX && upperSkin === true) {
                enclosedTopPerimeter += distance;
                // Enclosed top perimeter rear spar edge case conditional
            } else if (SD7037_x[i] < rearSparX && SD7037_x[i-1] > rearSparX && upperSkin === true) {
                deltaX = SD7037_x[i]-rearSparX;
                deltaY = SD7037_y[i]-rearTopY;

                distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                enclosedTopPerimeter += distance;
                // Enclosed top perimeter front spar edge case conditional
            } else if (SD7037_x[i] > frontSparX && SD7037_x[i+1] < frontSparX && upperSkin === true) {
                deltaX = SD7037_x[i]-frontSparX;
                deltaY = SD7037_y[i]-frontTopY;

                distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                enclosedTopPerimeter += distance;
            }
        } else if (i+1 === SD7037_x.length) {
            let deltaX = SD7037_x[i]-SD7037_x[0];
            let deltaY = SD7037_y[i]-SD7037_y[0];

            let distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

            totalPerimeter += distance;
        }
    }

    console.log("");
    console.log(`The total perimeter of the airfoil is ${totalPerimeter} meters`);
    console.log(`-- The perimeter of the rear top section of the airfoil is ${rearTopPerimeter} meters`);
    console.log(`-- The perimeter of the enclosed top section of the airfoil is ${enclosedTopPerimeter} meters`);
    console.log(`\n${SD7037_x.indexOf(Math.min(...SD7037_x))}`);
}

module.exports = {calculateAirfoilPerimeter};