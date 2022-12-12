"use strict"

const mongoose = require("mongoose"),
    Schema   = mongoose.Schema
    
const LibroSchema = new Schema({
    nombre     : { type:String, required:true },
    descripcion: { type:String, required:true },
    editorial  : { type:String, required:true },
    archivo    : { type:String, required:true }
})

LibroSchema.set('timestamps', true)

module.exports = mongoose.model("Libro", LibroSchema)