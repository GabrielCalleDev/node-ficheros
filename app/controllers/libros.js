"use strict"

const Libros = require("../models/libro")
const fs     = require('fs')
const path   = require('path')
const multer = require("multer")

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

exports.subirLibroFs = (req) => {
	if(req.file)
		// Añadimos extensión pdf a nuestro archivo cambiando su nombre
		fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
	else 
		console.log("No se ha subido ningún fichero")
}

/*
|--------------------------------------------------------------------------|
|  configuración de multer                                                 |
|--------------------------------------------------------------------------|
*/

exports.uploadFile = () => {
	const uploadFolder = path.join(__dirname,"../public/uploads")
	const uploadFilter = function (req, file, next) {
		const isPdf = (file.mimetype == 'application/pdf')?true:false;
    	if (isPdf) 
			next(null, true)
		else 
			next(null, false)
	}
	return multer({
		dest: uploadFolder,
		fileFilter: uploadFilter
	})
}