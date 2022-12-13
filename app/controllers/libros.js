const Libros = require("../models/libro"),
      fs     = require("fs"),
      path   = require("path"),
      multer = require("multer")

exports.getAll = async () => {
	try {
		const libros = await Libros.find({})
		return libros
	} catch (error) {
		console.error(`Error getting "Libros" ${error}`)
	}
}

exports.show = async (id) => {
	try {
		const libro = await Libros.findOne({id:id})
		return libro
	} catch (error) {
		console.error(`Error getting "libro" ${error}`)
	}
}

/*-------------------------------------------------------------------------|
|  Subida de archivos a la base de datos y al sistema de archivos          |
|-------------------------------------------------------------------------*/

exports.newBookDb = async (req) => {
	if(req.file){
		// Añadimos extensión pdf a nuestro archivo cambiando su nombre
		const fileName = req.file.path + '.' + req.file.mimetype.split('/')[1]
		fs.renameSync(req.file.path, fileName);

		try {
			const libro = new Libros({
				file: fs.readFileSync(fileName)
			})
			await libro.save()
			// Si guardamos en la base de datos, borramos el archivo del sistema de ficheros
			fs.unlink(fileName, (err) => { if (err) console.error(err) })
			return libro;
		} catch (error) {
			console.error(`Error creating "Book" ${error}`)
		}
	}

	
}
exports.newBookFs = async (req) => {
	if(req.file){
		// Añadimos extensión pdf a nuestro archivo cambiando su nombre
		const fileName = req.file.path + '.' + req.file.mimetype.split('/')[1]
		fs.renameSync(req.file.path, fileName);

		try {
			const libro = new Libros({
				path: fileName
			})
			await libro.save()
			return libro;
		} catch (error) {
			console.error(`Error creating "Book" ${error}`)
		}
	}
}

/*-------------------------------------------------------------------------|
|  Configuración de multer                                                 |
|-------------------------------------------------------------------------*/
exports.uploadFile = () => {
	const uploadFolder = path.join(__dirname,"../public/uploads")
	const uploadFilter = function (req, file, next) {
		const isPdf = (file.mimetype == 'application/pdf') ? true : false;
    	if (isPdf) 
			next(null, true)
		else 
			next(null, false)
	}
	return multer({
		dest      : uploadFolder,
		fileFilter: uploadFilter
	})
}