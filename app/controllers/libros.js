const Libros = require("../models/libro")
const fs     = require("fs")
const path   = require("path")
const Upload = require("./upload")

/*-------------------------------------------------------------------------|
|  Configuración subir archivos                                            |
|-------------------------------------------------------------------------*/
const uploadFolder  = path.join(__dirname,"../public/uploads")
const uploadPdfFile = new Upload('archivo', uploadFolder, 'application/pdf')


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

exports.uploadFileFs = (req, res) => {
    uploadPdfFile(req, res, async (err) => {
		console.log(req.file)
        if (err) {
            res.render("error",{ mensaje: err.message })
            return
        }

        if(!req.file){
            res.render("error",{ mensaje: "No has seleccionado ningún fichero" })
            return
        }else{
			try {
				const libro = new Libros({
					path: req.file.path,
					originalName: req.file.originalname
				})
				await libro.save()
			} catch (error) {
				console.error(`Error creating "Book" ${error}`)
			}
		}
        res.redirect('/')
    })
}

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
			fs.unlink(req.file.path, (err) => { if (err) console.error(err) })
			return libro;
		} catch (error) {
			console.error(`Error creating "Book" ${error}`)
		}
	}
}
