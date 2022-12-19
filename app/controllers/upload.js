multer = require("multer")
md5    = require("md5")
path   = require("path")

class UploadSingle{
    
    constructor(inputFile, uploadFolder, fileType){
        return this.buildUpload(inputFile, uploadFolder, fileType)
    }

    buildUpload(inputFile, uploadFolder, fileType) {
        const uploadFilter = function (req, file, callback) {
            const filetypes = new RegExp(fileType);
            const extname   = filetypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype  = filetypes.test(file.mimetype);
          
            if (mimetype && extname) callback(null, true)
            else callback(new Error('No es un archivo: ' + fileType), false)
        }
        const storage = multer.diskStorage({   
            destination: function(req, file, callback) { 
                callback(null, uploadFolder);
            }, 
            filename: function (req, file, callback) {
                const extension = file.originalname.split('.')[1]
                callback(null, md5(Date.now()) + '.' + extension);
            }
        })
        const limits = {
            fileSize : 2000000 // 2MB
        }
        return multer({
            storage   : storage,
            fileFilter: uploadFilter,
            limits    : limits
        }).single(inputFile)
    } 
}

module.exports = UploadSingle;