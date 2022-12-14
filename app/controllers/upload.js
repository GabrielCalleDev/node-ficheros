multer = require("multer")
md5    = require("md5")

class UploadSingle{
    
    constructor(inputFile, uploadFolder, fileMimeType){
        return this.buildUpload(inputFile, uploadFolder, fileMimeType)
    }

    buildUpload(inputFile, uploadFolder, fileMimeType) {
        const uploadFilter = function (req, file, callback) {
            console.log(file)
            const isPdf = (file.mimetype == fileMimeType) ? true : false
            if (isPdf) 
                callback(null, true)
            else{
                callback(new Error('No es un archivo pdf'), false)
            }
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
        return multer({
            storage   : storage,
            fileFilter: uploadFilter,
            limits: {
                fileSize : 2000000 // 2MB
            }
        }).single(inputFile)
    } 
}
module.exports = UploadSingle;

//callback(null, false)
//return callback(new Error('No es un archivo pdf'))