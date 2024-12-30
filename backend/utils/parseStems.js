const fs = require('fs');
const path = require('path');

/**
 * Parse the stems folder and return a list of songs with attributes.
 * @param {string} folderPath Path to the stems folder.
 * @returns {Array} Array of song objects.
 */
const parseStems = (folderPath) => {
    const files = fs.readdirSync(folderPath); // Read all files in the folder
    const songs = {};

    files.forEach((file) => {
        const ext = path.extname(file).toLowerCase();
        if (ext !== '.wav' && ext !== '.mp3') return; // Ignore non-audio files

        const [songName, bpm, stemName***REMOVED*** = path.basename(file, ext).split('_');
        if (!songs[songName***REMOVED***) {
            songs[songName***REMOVED*** = {
                name: songName,
                bpm: parseInt(bpm, 10),
                key: 'Unknown', // Placeholder; you can customize this logic later
                stems: [***REMOVED***,
            };
        }

        songs[songName***REMOVED***.stems.push({
            stemName,
            filePath: path.join(folderPath, file),
        });
    });

    return Object.values(songs); // Convert object to array
};

module.exports = parseStems;
