// Define web and spar coordinates.
const sparWebX = [75.9999999852095, 76.0000000147905, 76.0000000147905, 75.9999999852095];
const sparWebY = [5.7276196177205, 5.7276196177205, 28.711991785, 28.711991785];

const topFlangeX = [65.3215147757095, 75.9999999852095, 75.9999999852095, 65.3215147757095];
const topFlangeY = [28.27670910985262, 28.59370089485262, 28.711991785, 28.395];

const bottomFlangeX = [65.3215147757095, 75.9999999852095, 75.9999999852095, 65.3215147757095];
const bottomFlangeY = [5.40439063338354, 5.7276196177205, 5.845910507867878, 5.522681523530918];

// Calculate web area.
const h_web = 0.0229843724; // m
const t_web0 = 0.000029581011753; // m | calculated with t_web = L_wing/(S_shear*h_web)

var A_web0 = h_web*t_web0; // m^2

// console.log(A_web0);

// Calculate flange area
const w_flange = 0.0106874852095; // m
const t_flange0 = 0.000118290890; // m | calculated with the chapter 2 model.

var A_flange0 = w_flange*t_flange0; // m^2

// console.log(A_flange0);
// console.log(A_flange0);



// Define skin area from skinCGAndArea.js
const skinAreaMillimeter = 253.7240715729548; // mm^2
const skinAreaMeter = skinAreaMillimeter/1000000; // m^2

// Calculate summed spar area.
const summedSparArea = A_web0+2*A_flange0;

console.log(summedSparArea);

// console.log(summedArea);

// Calculate spar cg's.
const sparWebCGXMillimeter = (sparWebX[0]+sparWebX[1])/2;
const sparWebCGYMillimeter = (sparWebY[0]+sparWebY[2])/2;
const sparWebCGXMeter = sparWebCGXMillimeter/1000;
const sparWebCGYMeter = sparWebCGYMillimeter/1000;

const numeratorWebValueXMeter = sparWebCGXMeter*A_web0;
const numeratorWebValueYMeter = sparWebCGYMeter*A_web0;

// console.log(sparWebCGXMeter, sparWebCGYMeter);

const topFlangeCGXMillimeter = (topFlangeX[0]+topFlangeX[1])/2;
const topFlangeCGYMillimeter = (topFlangeY[0]+topFlangeY[2])/2;
const topFlangeCGXMeter = topFlangeCGXMillimeter/1000;
const topFlangeCGYMeter = topFlangeCGYMillimeter/1000;

const numeratorTopFlangeValueXMeter = topFlangeCGXMeter*A_flange0;
const numeratorTopFlangeValueYMeter = topFlangeCGYMeter*A_flange0;

// console.log(topFlangeCGXMeter, topFlangeCGYMeter);

const bottomFlangeCGXMillimeter = (bottomFlangeX[0]+bottomFlangeX[1])/2;
const bottomFlangeCGYMillimeter = (bottomFlangeY[0]+bottomFlangeY[2])/2;
const bottomFlangeCGXMeter = bottomFlangeCGXMillimeter/1000;
const bottomFlangeCGYMeter = bottomFlangeCGYMillimeter/1000;

const numeratorBottomFlangeValueXMeter = bottomFlangeCGXMeter*A_flange0;
const numeratorBottomFlangeValueYMeter = bottomFlangeCGYMeter*A_flange0;

// console.log(bottomFlangeCGXMeter, bottomFlangeCGYMeter);

// Calculate summed spar CGX and CGY.
const totalSparNumeratorXValues = numeratorWebValueXMeter+numeratorTopFlangeValueXMeter+numeratorBottomFlangeValueXMeter;
const totalSparNumeratorYValues = numeratorWebValueYMeter+numeratorTopFlangeValueYMeter+numeratorBottomFlangeValueYMeter;

console.log(totalSparNumeratorXValues);
console.log(totalSparNumeratorYValues);