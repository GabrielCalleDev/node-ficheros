const Libros = require("../models/libro")
const fs     = require("fs")
const path   = require("path")
const Upload = require("./upload")

exports.getAll = async (req, res) => {
	try {
		const libros = await Libros.find({})
		res.render("book-list", { libros: libros })
	} catch (error) {
		console.error(`Error getting "Libros" ${error}`)
	}
}

exports.downloadFile = async (req, res) => {
	try {
		const libro = await Libros.findOne({ _id:req.params.id })
		res.setHeader('Content-Disposition', 'attachment; filename=' + libro.originalName); // Para descargar el archivo
		//res.contentType('application/pdf'); // Para verlo en pantalla sin descargar
		res.send(libro.file)
	} catch (error) {
		console.error(`Error getting "Libro" ${error}`)
	}
}

exports.deleteFile = async (req, res) => {
	try {
		await Libros.deleteOne({_id: req.params.id})
		res.redirect('/')
	} catch (error) {
		console.error(`Error deleting "Libro" ${error}`)
	}
}

/*-------------------------------------------------------------------------|
|  Subida de archivos a la base de datos                                   |
|-------------------------------------------------------------------------*/
const uploadFolder  = path.join(__dirname,"../public/uploads")
const uploadPdfFile = new Upload('inputFilePdf', uploadFolder, 'pdf')

exports.uploadFile = (req, res) => {
    uploadPdfFile(req, res, async (err) => {
        if (err) {
            res.render("error",{ mensaje: err.message })
            return
        }

        if(!req.file){
            res.render("error",{ mensaje: "No has seleccionado ningún fichero" })
            return
        }
		
		try {
			const libro = new Libros({
				nombre      : req.body.nombre,
				descripcion : req.body.descripcion,
				editorial   : req.body.editorial,
				originalName: req.file.originalname,
				file        : Buffer.from(fs.readFileSync(req.file.path).toString('base64'), 'base64')
			})
			await libro.save()

			// Si guardamos en la base de datos, borramos el archivo del sistema de ficheros
			fs.unlink(req.file.path, (err) => { if (err) console.error(err) })
		} catch (error) {
			console.error(`Error creating "Book" ${error}`)
		}
		res.redirect('/')
    })
}
