const { calculateSparYCoordinates } = require("./sparsCalc.js");

const SD7037_x = [0.25, 0.24918, 0.2467675, 0.242865, 0.2376025, 0.231125, 0.2235625, 0.2150375, 0.2056525, 0.1955025, 0.1846625, 0.173235, 0.1613475, 0.1491375, 0.1367325, 0.124265, 0.1118625, 0.099655, 0.0877525, 0.07627, 0.0653125, 0.0549725, 0.0453425, 0.0365025, 0.028525, 0.021465, 0.015365, 0.010255, 0.006155, 0.00308, 0.001045, 0.0000525, 0.0003175, 0.002015, 0.005095, 0.0095, 0.015185, 0.02211, 0.03021, 0.0394125, 0.049625, 0.06074, 0.0726375, 0.0851775, 0.09822, 0.1116075, 0.125185, 0.1387975, 0.152285, 0.1654925, 0.1782625, 0.190445, 0.20188, 0.21241, 0.22189, 0.2301775, 0.2371475, 0.2426925, 0.246725, 0.2491775, 0.25];
const SD7037_y = [0.01, 0.010105, 0.01045, 0.01109, 0.0120275, 0.0132375, 0.0146625, 0.016225, 0.0178525, 0.01947, 0.0210325, 0.0225275, 0.02393, 0.0252125, 0.026345, 0.0272925, 0.0280275, 0.028525, 0.02876, 0.02872, 0.028395, 0.0277825, 0.026885, 0.025715, 0.0242875, 0.0226225, 0.02075, 0.018715, 0.01658, 0.014425, 0.01234, 0.0104625, 0.0090175, 0.0079025, 0.0069325, 0.0061475, 0.0055575, 0.005165, 0.0049575, 0.00492, 0.0050325, 0.0052725, 0.005615, 0.006035, 0.00651, 0.007025, 0.00756, 0.0081, 0.0086275, 0.0091275, 0.00958, 0.009965, 0.01026, 0.010455, 0.01055, 0.010545, 0.0104625, 0.01033, 0.0101775, 0.0100525, 0.01];

function calculateAirfoilPerimeter(frontSparX, rearSparX) {
    if (rearSparX !== undefined) {
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

        let currentUpperSkin;
        let currentLowerSkin;

        let deltaX;
        let deltaY;
        let distance;

        // Calculate the distances between each airfoil point
        for (let i = 0; i < SD7037_x.length; i++) {
            if (i < 31) {
                currentUpperSkin = true;
                currentLowerSkin = false;
            } else if (i > 31) {
                currentUpperSkin = false;
                currentLowerSkin = true;
            } else if (i === 31 || i === 0) {
                currentUpperSkin = true;
                currentLowerSkin = true;
            }

            if (i+1 !== SD7037_x.length) {
                deltaX = SD7037_x[i]-SD7037_x[i+1];
                deltaY = SD7037_y[i]-SD7037_y[i+1];

                distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                totalPerimeter += distance;

                // Rear top perimeter conditional
                if (SD7037_x[i] > rearSparX && SD7037_x[i+1] > rearSparX && currentUpperSkin === true) {
                    rearTopPerimeter += distance;
                    
                    // Rear top perimeter edge case conditional
                    // This conditional also contains the enclosed top perimeter rear spar edga case
                    // because the conditionals are the same
                } else if (SD7037_x[i] > rearSparX && SD7037_x[i+1] < rearSparX && currentUpperSkin === true) {
                    // Rear top perimeter edge case
                    deltaX = SD7037_x[i]-rearSparX;
                    deltaY = SD7037_y[i]-rearTopY;

                    distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                    rearTopPerimeter += distance;

                    // Enclosed top perimeter rear spar edge case
                    deltaX = rearSparX-SD7037_x[i+1];
                    deltaY = rearTopY-SD7037_y[i+1];

                    distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                    enclosedTopPerimeter += distance;
                    

                    // Enclosed top perimeter conditional
                } else if (SD7037_x[i] < rearSparX && SD7037_x[i+1] < rearSparX && SD7037_x[i] > frontSparX && SD7037_x[i+1] > frontSparX && currentUpperSkin === true) {
                    enclosedTopPerimeter += distance;

                    // Enclosed top perimeter front spar edge case conditional
                    // This conditional also contains the front top perimeter edge case conditional
                    // because they have the same conditional
                } else if (SD7037_x[i] > frontSparX && SD7037_x[i+1] < frontSparX && currentUpperSkin === true) {
                    // Enclosed top perimeter front spar edge case
                    deltaX = SD7037_x[i]-frontSparX;
                    deltaY = SD7037_y[i]-frontTopY;

                    distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                    enclosedTopPerimeter += distance;

                    // Front top perimeter edge case
                    deltaX = frontSparX-SD7037_x[i+1];
                    deltaY = frontTopY-SD7037_y[i+1];

                    distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                    frontTopPerimeter += distance;

                    // Front top perimeter conditional
                } else if (SD7037_x[i] < frontSparX && SD7037_x[i+1] < frontSparX && SD7037_y[i+1] > 0.01 && currentUpperSkin === true) {
                    frontTopPerimeter += distance;
                    
                    
                    // Front top perimeter edge case conditional
                } else if (SD7037_x[i] < frontSparX && SD7037_x[i+1] < frontSparX && currentLowerSkin === true) {
                    frontBottomPerimeter += distance;
                    

                    // Front bottom perimeter edge case conditional
                    // This conditional also contains the enclosed bottom perimeter front spar 
                    // edge case, because the conditionals are the same
                } else if (SD7037_x[i] < frontSparX && SD7037_x[i+1] > frontSparX && currentLowerSkin === true) {
                    // Front bottom perimeter edge case
                    deltaX = frontSparX-SD7037_x[i];
                    deltaY = frontBottomY-SD7037_y[i];

                    distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                    frontBottomPerimeter += distance;

                    // Enclosed bottom perimeter front spar edge case
                    deltaX = SD7037_x[i+1]-frontSparX;
                    deltaY = SD7037_y[i+1]-frontBottomY;

                    distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                    enclosedBottomPerimeter += distance;
                    

                    // Enclosed bottom perimeter conditional
                } else if (SD7037_x[i] > frontSparX && SD7037_x[i+1] < rearSparX && currentLowerSkin === true) {
                    enclosedBottomPerimeter += distance;
                    

                    // Enclosed bottom perimeter rear spar edge case conditional
                    // This conditional also contains the rear bottom perimeter rear spar edge case
                    // because the conditionals are the same
                } else if (SD7037_x[i] < rearSparX && SD7037_x[i+1] > rearSparX && currentLowerSkin === true) {
                    // Enclosed bottom perimeter rear spar edge case
                    deltaX = rearSparX-SD7037_x[i];
                    deltaY = rearBottomY-SD7037_y[i];

                    distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                    enclosedBottomPerimeter += distance;

                    // Rear bottom perimeter rear spar edge case
                    deltaX = SD7037_x[i+1]-rearSparX;
                    deltaY = SD7037_y[i+1]-rearBottomY;

                    distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                    rearBottomPerimeter += distance;
                    

                    // Rear bottom perimeter conditional
                } else if (SD7037_x[i] > rearSparX && currentLowerSkin === true) {
                    rearBottomPerimeter += distance;

                    
                }
                // Total perimeter edge case
            } else if (i+1 === SD7037_x.length) {
                let deltaX = SD7037_x[i]-SD7037_x[0];
                let deltaY = SD7037_y[i]-SD7037_y[0];

                let distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                totalPerimeter += distance;
            }
        }

        console.log(`\nThe total perimeter of the airfoil is ${totalPerimeter} meters`);
        console.log(`-- The perimeter of the rear top section of the airfoil is ${rearTopPerimeter} meters`);
        console.log(`-- The perimeter of the enclosed top section of the airfoil is ${enclosedTopPerimeter} meters`);
        console.log(`-- The perimeter of the front top section of the airfoil is ${frontTopPerimeter} meters`);
        console.log(`-- The perimeter of the front bottom section of the airfoil is ${frontBottomPerimeter} meters`);
        console.log(`-- The perimeter of the enclosed bottom section of the airfoil is ${enclosedBottomPerimeter} meters`);
        console.log(`-- The perimeter of the rear bottom section of the airfoil is ${rearBottomPerimeter} meters`);
        console.log(`\nCONTROL. THE SUMMED PERIMETER OF THE SUBSECTIONS IS: ${rearTopPerimeter+enclosedTopPerimeter+frontTopPerimeter+frontBottomPerimeter+enclosedBottomPerimeter+rearBottomPerimeter} meters\nTHE SUMMED PERIMETER OF THE SUBSECTIONS SHOULD BE THE SAME AS THE TOTAL PERIMETER!`);

        const error = 0.0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001;
        if (rearTopPerimeter+enclosedTopPerimeter+frontTopPerimeter+frontBottomPerimeter+enclosedBottomPerimeter+rearBottomPerimeter >= totalPerimeter-error || rearTopPerimeter+enclosedTopPerimeter+frontTopPerimeter+frontBottomPerimeter+enclosedBottomPerimeter+rearBottomPerimeter <= totalPerimeter+error) {
            console.log("\nIT WORKS");
        } else {
            console.log("\nIT DOESN'T WORK");
        }

        return [rearTopPerimeter, enclosedTopPerimeter, frontTopPerimeter, frontBottomPerimeter, enclosedBottomPerimeter, rearBottomPerimeter];
    } else if (rearSparX === undefined) {
        // Define the coordinates of the spars
        const sparYCoordinates = calculateSparYCoordinates(frontSparX);

        const frontTopY = sparYCoordinates[1];
        const frontBottomY = sparYCoordinates[2];

        let totalPerimeter = 0;

        let rearTopPerimeter = 0;
        let frontTopPerimeter = 0;
        let frontBottomPerimeter = 0;
        let rearBottomPerimeter = 0;

        let currentUpperSkin;
        let currentLowerSkin;

        let deltaX;
        let deltaY;
        let distance;

        for (let i = 0; i < SD7037_x.length; i++) {
            if (i < 31) {
                currentUpperSkin = true;
                currentLowerSkin = false;
            } else if (i > 31) {
                currentUpperSkin = false;
                currentLowerSkin = true;
            } else if (i === 31 || i === 0) {
                currentUpperSkin = true;
                currentLowerSkin = true;
            }

            // Calculate the total perimeter
            if (i !== SD7037_x.length-1) {
                deltaX = SD7037_x[i]-SD7037_x[i+1];
                deltaY = SD7037_y[i]-SD7037_y[i+1];

                distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                totalPerimeter += distance;

                // Rear top perimeter conditional
                if (SD7037_x[i] > frontSparX && SD7037_x[i+1] > frontSparX && currentUpperSkin === true) {
                    rearTopPerimeter += distance;

                    // Rear top perimeter edge case conditional
                    // This conditional also contains the front top perimeter edge case
                    // because the conditionals are the same
                } else if (SD7037_x[i] > frontSparX && SD7037_x[i+1] < frontSparX && currentUpperSkin === true) {
                    // Rear top perimeter edge case
                    deltaX = SD7037_x[i]-frontSparX;
                    deltaY = SD7037_y[i]-frontTopY;

                    distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                    rearTopPerimeter += distance;

                    // Front top perimeter edge case
                    deltaX = frontSparX-SD7037_x[i+1];
                    deltaY = frontTopY-SD7037_y[i+1];

                    distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                    frontTopPerimeter += distance;

                    // Front top perimeter conditional
                } else if (SD7037_x[i] < frontSparX && SD7037_x[i+1] < frontSparX && SD7037_y[i+1] > 0.01 && currentUpperSkin === true) {
                    frontTopPerimeter += distance;

                    // Front bottom perimeter conditional
                } else if (SD7037_x[i] < frontSparX && SD7037_x[i+1] < frontSparX && currentLowerSkin === true) {
                    frontBottomPerimeter += distance;

                    // Front bottom perimeter edge case conditional
                    // This conditional also contains the rear bottom perimeter edge case
                    // because the conditionals are the same
                } else if (SD7037_x[i] < frontSparX && SD7037_x[i+1] > frontSparX && currentLowerSkin === true) {
                    // Front bottom perimeter edge case
                    deltaX = frontSparX-SD7037_x[i];
                    deltaY = frontBottomY-SD7037_y[i];

                    distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                    frontBottomPerimeter += distance;

                    // Rear bottom perimeter edge case
                    deltaX = SD7037_x[i+1]-frontSparX;
                    deltaY = SD7037_y[i+1]-frontBottomY;

                    distance = Math.sqrt(Math.pow(deltaX, 2)+Math.pow(deltaY, 2));

                    rearBottomPerimeter += distance;

                    // Rear bottom perimeter conditional
                } else if (SD7037_x[i] > frontSparX && currentLowerSkin === true) {
                    rearBottomPerimeter += distance;
                }
            }
        }

        console.log(`\nThe total perimeter of the airfoil is ${totalPerimeter} meters`);
        console.log(`-- The perimeter of the rear top section of the airfoil is ${rearTopPerimeter} meters`);
        console.log(`-- The perimeter of the front top section of the airfoil is ${frontTopPerimeter} meters`);
        console.log(`-- The perimeter of the front bottom section of the airfoil is ${frontBottomPerimeter} meters`);
        console.log(`-- The perimeter of the rear bottom section of the airfoil is ${rearBottomPerimeter} meters`);
        console.log(`\nCONTROL. THE SUMMED PERIMETER OF THE SUBSECTIONS IS: ${rearTopPerimeter+frontTopPerimeter+frontBottomPerimeter+rearBottomPerimeter} meters\nTHE SUMMED PERIMETER OF THE SUBSECTIONS SHOULD BE THE SAME AS THE TOTAL PERIMETER!`);

        const error = 0.0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001;
        if (rearTopPerimeter+frontTopPerimeter+frontBottomPerimeter+rearBottomPerimeter >= totalPerimeter-error || rearTopPerimeter+enclosedTopPerimeter+frontTopPerimeter+frontBottomPerimeter+enclosedBottomPerimeter+rearBottomPerimeter <= totalPerimeter+error) {
            console.log("\nIT WORKS");
        } else {
            console.log("\nIT DOESN'T WORK");
        }

        return [rearTopPerimeter, frontTopPerimeter, frontBottomPerimeter, rearBottomPerimeter];
    }
}

module.exports = {calculateAirfoilPerimeter};

// TROUBLESHOOTING
// Ik denk dat het probleem bij de enclosed top perimeter calculations zit, want de enclosed top perimeter
// is een stuk kleiner dan de enclosed bottom perimeter, terwijl je zou verwachten dat ze bijna hetzelfde
// zijn als je kijkt naar de vorm van de airfoil.