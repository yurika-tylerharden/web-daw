const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path to the stems folder
const stemsFolderPath = path.join(__dirname, 'backend', 'data', 'stems');

// Ensure the directory exists
if (!fs.existsSync(stemsFolderPath)) {
    console.error('Error: Stems folder does not exist:', stemsFolderPath);
    process.exit(1);
}

// Supported file extensions
const supportedExtensions = ['.wav', '.mp3', '.m4a'];

// Iterate through each file in the folder
fs.readdirSync(stemsFolderPath).forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(stemsFolderPath, file);

    // Skip unsupported file types
    if (!supportedExtensions.includes(ext)) {
        console.log(`Skipping unsupported file: ${file}`);
        return;
    }

    // Escape or wrap file paths with spaces
    const escapedFilePath = `"${filePath}"`; // Wrap in quotes to handle spaces
    const escapedFileName = `"${file}"`;     // Wrap file name for R2 object key

    // Upload file to local R2 bucket
    try {
        console.log(`Uploading ${file} to R2 bucket...`);
        execSync(`wrangler r2 object put web-daw/${escapedFileName} --file ${escapedFilePath} --local`, { stdio: 'inherit' });
        console.log(`Successfully uploaded: ${file}`);
    } catch (error) {
        console.error(`Failed to upload ${file}:`, error.message);
    }
});