import fs from 'fs';

function readJSON(filePath) {
    try {
        const readFileSync = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(readFileSync);
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        return null;
    }
}

function writeJSON(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing file to disk: ${error}`);
    }
}

const data1 = readJSON('translationsV1.json');
const data2 = readJSON('translationsV2.json');

if (data1 && data2) {
    const combinedData = [...data1, ...data2];

    const uniqueData = [];
    const seenWords = new Set();

    combinedData.forEach((entry) => {
        if (!seenWords.has(entry.word)) {
            seenWords.add(entry.word);
            uniqueData.push(entry);
        }
    });

    writeJSON('combined.json', uniqueData);

    console.log(readJSON('combined.json').length);
    console.log('JSON files have been merged and duplicates removed.');
} else {
    console.log('One or both of the JSON files could not be read. Please check the file paths and try again.');
}
