const express = require('express');
const multer = require('multer');
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'recipes/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const folder = '/recipes/';

const backend = () => {
    const upload = multer({ storage: storage });

    const app = express();
    const morgan = require('morgan');
    app.use(morgan('combined'));


    app.post('/', upload.single('file'), async (req, res) => {
        res.json(req.file);
    });

    app.get('/:fileName', async (req, res) => {
        const filePath = path.join(__dirname, '..', folder, req.params.fileName);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found' });
        }
        
        res.sendFile(filePath);
    });
    
    app.delete('/:fileName', async (req, res) => {
        try {
            const filePath = path.join(__dirname, '..', folder, req.params.fileName);
            
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: 'File not found' });
            }
    
            fs.unlinkSync(filePath);
            return res.json({ message: 'File deleted' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting file' });
        }
    });
    

    app.listen(3000, () => console.log('[SERVER] Listening on port 3000'));
}



module.exports = backend;