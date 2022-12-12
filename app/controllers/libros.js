"use strict"

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
