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

exports.newBook = (req, res) => {
    res.render("book-new")
}

exports.show = async (id) => {
	try {
		const libro = await Libros.findOne({id:id})
		return libro
	} catch (error) {
		console.error(`Error getting "libro" ${error}`)
	}
}

exports.downloadFile = (req, res) => {
    console.log(req.params)
    res.send(req.params)
}


/*-------------------------------------------------------------------------|
|  Subida de archivos a la base de datos y al sistema de archivos          |
|-------------------------------------------------------------------------*/

const uploadFolder  = path.join(__dirname,"../public/uploads")
const uploadPdfFile = new Upload('inputFilePdf', uploadFolder, 'application/pdf')

exports.uploadFileFS = (req, res) => {
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
				path: req.file.path,
				originalName: req.file.originalname
			})
			await libro.save()
		} catch (error) {
			console.error(`Error creating "Book" ${error}`)
		}
		res.redirect('/')	
    })
}

exports.uploadFileDB = (req, res) => {
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
			var img = fs.readFileSync(req.file.path);
			var encoded_image = img.toString('base64');

			const libro = new Libros({
				file: Buffer.from(encoded_image, 'base64'),
				originalName: req.file.originalname
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
