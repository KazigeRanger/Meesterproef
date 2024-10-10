const { calculateAirfoilPerimeter } = require("./../Algemeen/perimeterCalc.js");
const sqlite3 = require("sqlite3");

function calculateBucklingFailurePressure(laminate, frontSparX, rearSparX) {
    if (rearSparX === undefined) {
        const oneSparPerimeters = calculateAirfoilPerimeter(frontSparX);
        const maxPerimeter = Math.max(...oneSparPerimeters);

        const db = new sqlite3.Database("./../Materials Database/material_database.db");

        db.all(`SELECT * FROM material_properties WHERE laminate = ${laminate};`, [], (err, row) => {
            if (err) {
                throw err;
            }

            const iterationCount = 10;
            let a = 0.5; // m
            for (let i = 0; i < iterationCount; i++) {
                let pressures = [];
                for (let m = 1; m < iterationCount; m++) {
                    let P_cr = ((maxPerimeter*Math.pow(Math.PI, 2))/(Math.pow(a, 2)))*(row[0]["D11 (Nm)"]*Math.pow(m, 2)+2*(row[0]["D12 (Nm)"]+2*row[0]["D66 (Nm)"])*Math.pow(a/maxPerimeter, 2)+row[0]["D22 (Nm)"]/Math.pow(m, 2)*Math.pow(a/maxPerimeter, 4));
                    pressures.push(P_cr);

                    console.log(P_cr);

                    if (m > 1 && pressures[m-2] < pressures[m-1]) {
                        break;
                    } else if (m > 1 && pressures[m-2] > pressures[m-1]) {
                        continue;
                    }
                }
            }
        });
    }
}

const chordLength = 0.25; // m
const frontSparX = 0.304*chordLength; // m
const rearSparX = 0.5234092*chordLength; // m

const laminate = '0';

calculateBucklingFailurePressure(laminate, frontSparX);