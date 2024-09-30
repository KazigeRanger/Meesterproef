function generateSparLocations(sparLocations, n, locationRange) {
    const deltaRange = Math.max(locationRange[0], locationRange[locationRange.length-1])-Math.min(locationRange[0], locationRange[locationRange.length-1])
    const scalingFactor = deltaRange/n;
    for (let i = 1; i < n; i++) {
        sparLocations.push(locationRange[0]+i*scalingFactor);
    }

    return sparLocations;
}
module.exports = {generateSparLocations};