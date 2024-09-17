function executeShoelaceFormula(xVertices, yVertices) {
    let calculatedTerms = [];

    for (let i = 0; i < xVertices.length-1; i++) {
        let calculatedTerm = xVertices[i]*yVertices[i+1]-yVertices[i]*xVertices[i+1];
        calculatedTerms.push(calculatedTerm);
    }

    var loopTerm = xVertices[0]*yVertices[1]-yVertices[0]*xVertices[1];
    calculatedTerms.push(loopTerm);

    var area = 0.5 * calculatedTerms.reduce((accumulator, currentValue) => accumulator+currentValue);
    return area;
}

module.exports = {executeShoelaceFormula};