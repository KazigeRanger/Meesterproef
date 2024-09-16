// Define summed values from previous models.
const summedSkinArea = 0.00007104274004042736; // m^2
const summedSparArea = 0.000003208365264686912; // m^2

const summedSkinNumeratorXValuesMeter = 8794.066252323062/1000;
const summedSparNumeratorXValuesMeter = 2.3033567589934387e-7;

const summedSkinNumeratorYValuesMeter = 1086.8107419049531/1000;
const summedSparNumeratorYValuesMeter = 5.4842732641122564e-8;

// Calculate total summed area, CGX and CGY.
var summedTotalArea = summedSkinArea+summedSparArea;
var summedTotalNumeratorX = summedSkinNumeratorXValuesMeter+summedSparNumeratorXValuesMeter;
var summedTotalNumeratorY = summedSkinNumeratorYValuesMeter+summedSparNumeratorYValuesMeter;

summedTotalArea *= 1000000;
summedTotalNumeratorX *= 1000;
summedTotalNumeratorY *= 1000;

// Calculate the location of the center of gravity of the airfoil.
const x_cg = summedTotalNumeratorX/summedTotalArea;
const y_cg = summedTotalNumeratorY/summedTotalArea;

console.log(summedTotalNumeratorX);
console.log(summedTotalNumeratorY);
console.log(summedTotalArea);

console.log('The location of the center of gravity of the airfoil is x: ' + x_cg + ', and y: ' + y_cg);