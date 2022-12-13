multer = require("multer")
md5    = require("md5")
class UploadSingle{
    
    constructor(inputFile, uploadFolder, fileMimeType){
        return this.buildUpload(inputFile, uploadFolder, fileMimeType)
    }

    buildUpload(inputFile, uploadFolder, fileMimeType) {
        const uploadFilter = function (req, file, next) {
            const isPdf = (file.mimetype == fileMimeType) ? true : false
            if (isPdf) 
                next(null, true)
            else 
                next(null, false)
        }
        const storage = multer.diskStorage({   
            destination: function(req, file, cb) { 
                cb(null, uploadFolder);
            }, 
            filename: function (req, file, cb) {
                const extension = file.originalname.split('.')[1]
                cb(null, md5(Date.now()) + '.' + extension);
            }
        })
        return multer({
            storage   : storage,
            fileFilter: uploadFilter
        }).single(inputFile)
    } 
}
module.exports = UploadSingle;
