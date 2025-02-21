const fs = require('fs');
const path = require('path');
const getFolder = () => {
    return fs.readdirSync(path.join(__dirname, '..', 'recipes'));
}

const FOLDER_PATH = path.join(__dirname, '..', 'recipes');

module.exports = { getFolder, FOLDER_PATH };