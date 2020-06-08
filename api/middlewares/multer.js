import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'imagePath') {
            cb(null, '/assets/image');
        }
        if (file.fieldname === 'audioPath') {
            cb(null, '/assets/audio');
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        if (file.fieldname === 'imagePath') {
            cb(null, 'image-' + uniqueSuffix);
        }
        if (file.fieldname === 'audioPath') {
            cb(null, 'audio-' + uniqueSuffix);
        }
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'imagePath') {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            // Check file type to be png, jpeg, or jpg
            cb(null, true);
        } else {
            // Else fails
            cb(null, false);
        }
    }

    if (file.fieldname === 'audioPath') {
        if (file.mimetype === 'audio/mp3') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}


const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default upload;