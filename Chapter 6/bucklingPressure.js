const { calculateAirfoilPerimeter } = require("./../Algemeen/perimeterCalc.js");

function calculateBucklingFailurePressure(frontSparX, rearSparX, laminate) {
    if (rearSparX === undefined) {
        const oneSparPerimeters = calculateAirfoilPerimeter(frontSparX);
        const maxPerimeter = Math.max(...oneSparPerimeters);
    }
}