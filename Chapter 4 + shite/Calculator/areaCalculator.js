const fs = require('fs');

// Import the "executeShoelaceFormula" and "divideAreas" functions
const { executeShoelaceFormula } = require("./shoelacing.js");
const { divideAreas } = require("./areaDivider.js");
const { generateSparLocations } = require("./generateSparLocations.js");
const { json } = require('stream/consumers');

// Define the vertices that describe airfoil shape SD7037
const SD7037_x = [0.25, 0.24918, 0.2467675, 0.242865, 0.2376025, 0.231125, 0.2235625, 0.2150375, 0.2056525, 0.1955025, 0.1846625, 0.173235, 0.1613475, 0.1491375, 0.1367325, 0.124265, 0.1118625, 0.099655, 0.0877525, 0.07627, 0.0653125, 0.0549725, 0.0453425, 0.0365025, 0.028525, 0.021465, 0.015365, 0.010255, 0.006155, 0.00308, 0.001045, 0.0000525, 0.0003175, 0.002015, 0.005095, 0.0095, 0.015185, 0.02211, 0.03021, 0.0394125, 0.049625, 0.06074, 0.0726375, 0.0851775, 0.09822, 0.1116075, 0.125185, 0.1387975, 0.152285, 0.1654925, 0.1782625, 0.190445, 0.20188, 0.21241, 0.22189, 0.2301775, 0.2371475, 0.2426925, 0.246725, 0.2491775, 0.25];
const SD7037_y = [0.01, 0.010105, 0.01045, 0.01109, 0.0120275, 0.0132375, 0.0146625, 0.016225, 0.0178525, 0.01947, 0.0210325, 0.0225275, 0.02393, 0.0252125, 0.026345, 0.0272925, 0.0280275, 0.028525, 0.02876, 0.02872, 0.028395, 0.0277825, 0.026885, 0.025715, 0.0242875, 0.0226225, 0.02075, 0.018715, 0.01658, 0.014425, 0.01234, 0.0104625, 0.0090175, 0.0079025, 0.0069325, 0.0061475, 0.0055575, 0.005165, 0.0049575, 0.00492, 0.0050325, 0.0052725, 0.005615, 0.006035, 0.00651, 0.007025, 0.00756, 0.0081, 0.0086275, 0.0091275, 0.00958, 0.009965, 0.01026, 0.010455, 0.01055, 0.010545, 0.0104625, 0.01033, 0.0101775, 0.0100525, 0.01];

// Define the spar locations
const chordLength = 0.25; // m

const frontSparX = 0.304*chordLength; // m
const rearSparX = 0.608*chordLength; // m

// Define the vertices of the front, enclosed and rear area
const outputs = divideAreas(SD7037_x, SD7037_y, frontSparX, rearSparX);
const frontAreaXCoords = outputs[0];
const frontAreaYCoords = outputs[1];
const enclosedAreaXCoords = outputs[2];
const enclosedAreaYCoords = outputs[3];
const rearAreaXCoords = outputs[4];
const rearAreaYCoords = outputs[5];

// Place your code here
// const error = 0.00000001;
// for (let rearSparX = 0.5*chordLength; rearSparX < chordLength; rearSparX += 0.0000001) {
//     console.log(rearSparX);
//     let vertices = divideAreas(SD7037_x, SD7037_y, frontSparX, rearSparX);

//     let enclosedX = vertices[2];
//     let enclosedY = vertices[3];
//     let rearX = vertices[4];
//     let rearY = vertices[5];

//     let enclosedArea = executeShoelaceFormula(enclosedX, enclosedY);
//     let rearArea = executeShoelaceFormula(rearX, rearY);

//     if (enclosedArea <= rearArea+error && enclosedArea >= rearArea-error) {
//         console.log(`The position of the rear spar when the enclosed and rear areas are equal is: ${/*parseFloat(rearSparX.toFixed(15))*/rearSparX}`);
//         break;
//     } else {
//         continue;
//     }
// }

const airfoilArea = executeShoelaceFormula(SD7037_x, SD7037_y);
console.log(`The airfoil area is: ${airfoilArea}`);

const frontArea = executeShoelaceFormula(frontAreaXCoords, frontAreaYCoords);
console.log(`The front area is: ${frontArea}`);

const enclosedArea = executeShoelaceFormula(enclosedAreaXCoords, enclosedAreaYCoords);
console.log(`The enclosed area is: ${enclosedArea}`);

const rearArea = executeShoelaceFormula(rearAreaXCoords, rearAreaYCoords);
console.log(`The rear area is: ${rearArea}`);

const minArea = Math.min(frontArea, enclosedArea, rearArea);
console.log(`The smallest area is: ${minArea}`);

fs.writeFileSync('output.json', JSON.stringify([frontSparLocations, rearSparLocations, minAreas]), 'utf8');
// console.log(minAreas);

var totalAreaBySummation = frontArea+enclosedArea+rearArea;
console.log(`The total area by summation is: ${totalAreaBySummation}`);

if (airfoilArea.toFixed(10) === totalAreaBySummation.toFixed(10)) {
    console.log("IT WORKS");
} else {
    console.log("BROKEN");
}