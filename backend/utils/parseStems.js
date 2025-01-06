const parseStems = async (r2Bucket) => {
    const list = await r2Bucket.list(); // Fetch objects in the bucket
    const files = list.objects.map((object) => object.key);
    const songs = {};

    files.forEach((file) => {
        const decodedFile = decodeURIComponent(file); // Decode the filename
        const ext = decodedFile.split('.').pop().toLowerCase();
        if (ext !== 'wav' && ext !== 'm4a' && ext !== 'mp3') return; // Ignore non-audio files

        const [songName, bpm, stemNameWithExt***REMOVED*** = decodedFile.split('/').pop().split('_');
        const stemName = stemNameWithExt.replace(/\.[^/.***REMOVED***+$/, ""); // Remove file extension

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
            filePath: file, // Use the full path from R2
            stemGroup: 'Track', // Default group
            assigned_to: null, // Default assigned_to
            volume: 1.0 // Default volume
        });
    });

    return Object.values(songs); // Convert object to array
};

export default parseStems;