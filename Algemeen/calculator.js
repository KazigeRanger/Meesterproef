const { calculateSparYCoordinates } = require("./sparsCalc.js");
const { calculateAirfoilPerimeter } = require("./perimeterCalc.js");

const chordLength = 0.25; // m
const frontSparX = 0.304*chordLength; // m
const rearSparX = 0.5234092*chordLength; // m

// calculateSparYCoordinates(frontSparX, rearSparX);

calculateAirfoilPerimeter(frontSparX, rearSparX);