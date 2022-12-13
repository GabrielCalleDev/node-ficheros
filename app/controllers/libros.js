const Libros = require("../models/libro")

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
	console.log(req.file)
	if(req.file){
		try {
			const libro = new Libros({
				file: req.file.path,
				originalName: req.file.originalname
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
		try {
			const libro = new Libros({
				path: req.file.path,
				originalName: req.file.originalname
			})
			await libro.save()
			return libro;
		} catch (error) {
			console.error(`Error creating "Book" ${error}`)
		}
	}
}