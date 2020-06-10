import multer, { MulterError } from 'multer'
import path from 'path'
import config from '../config'

const audioFormatFile = ['.mp3']
const imageFormatFile = ['.jpg', '.png']
const typeFile = 'image'

const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    let des

    if (file.fieldname === 'audioPath') {
      des = path.join(__dirname, '../../public/asset/upload/audios')
    }
    
    if (file.fieldname === 'imagePath') {
      des = path.join(__dirname, '../../public/asset/upload/images')
    }
    req.filePath = des

    cb(null, des)
  },
  filename : (req, file , cb) => {
    let fileName = file.originalname

    const ext = path.extname(fileName)
    if (fileName.length > 20 ) {
      fileName = 'toeic_custom.'+ext
    }
    const finalFileName = `${Date.now()}-${fileName}`

    if (file.fieldname === 'audioPath') {
      req.audioPath =  finalFileName
    }

    if (file.fieldname === 'imagePath') {
      req.imagePath = finalFileName
    }

    cb(null, finalFileName)
  }
})

function fileFilter (req, file, cb) {
  if(file == null) return cb(null, false)

  const ext = path.extname(file.originalName)

  if (ext==='.svg') {
    req.fileValidationError = 'svg format is not support'
    return cb(null, false)
  } 

  if (!imageFormatFile.includes(ext.toLowerCase()) && !audioFormatFile.includes(ext.toLowerCase())) {
    req.invalidFile = 'invalid file'
    return cb(null, false)
  }

  return cb(null, true)
}


const upload = multer({storage: storage, limits : {fileSize: config.file.sizeLimit}})

export default upload